import { ProductRepository } from "./index";
import { db } from "../../../infraestructure/orm";
import { Product } from "../../models/product";
import { NotFoundError } from "../../errors/not-found-error";
import { Sale } from "../../models/sale";

export class DatabaseProductRepository implements ProductRepository {
  constructor(private database = db) {}

  async getAll(restaurantId: string): Promise<Array<Product>> {
    const { rows: productsWithouSale } = await this.database.query<Omit<Product, 'sale' | 'restaurantId'> & { restaurant_id: string }>(`
      SELECT 
        p.*
      FROM 
        products p  
      WHERE 
        restaurant_id = $1
    `, [restaurantId]);

    const { rows: sales } = await this.database.query<Omit<Sale, 'productId'> & { product_id: string }>(`
      SELECT 
        s.id,
        s.price,
        s.description,
        s.product_id,
        COALESCE(json_agg(json_build_object(
          'id', h.id, 
          'start', h.start, 
          'end', h.end, 
          'days', h.days
        )) FILTER (WHERE h.id IS NOT NULL), '[]') AS hours
      FROM 
        sales s
      LEFT JOIN 
        sales_hours h ON s.id = h.sale_id
      WHERE 
        s.product_id IN (
          SELECT 
            id
          FROM 
            products
          WHERE 
            restaurant_id = $1
        )
      GROUP BY 
        s.id;
    `, [restaurantId]);

    return productsWithouSale.map((row) => Product.create({
      id: row.id,
      restaurantId: row.restaurant_id,
      name: row.name,
      price: row.price,
      category: row.category,
      sale: sales.filter(sale => sale.product_id === row.id).map(sale => Sale.create({
        id: sale.id,
        productId: sale.product_id,
        price: sale.price,
        description: sale.description,
        hours: sale.hours.map(hour => ({
          id: hour.id,
          start: hour.start,
          end: hour.end,
          days: hour.days,
        })),
      }))[0] || null,
    }));
  }

  async create(product: Product): Promise<void> {
    try {
      await this.database.query(`
        INSERT INTO products (id, restaurant_id, name, price, category)
        VALUES ($1, $2, $3, $4, $5)
      `, [product.id, product.restaurantId, product.name, product.price, product.category]);
    }
    catch (error: any) {
      if (error.constraint === 'products_restaurant_id_fkey') {
        throw new NotFoundError('Restaurant not found');
      }
    }
  }

  async update(product: Product): Promise<void> {
    await this.database.query(`
      UPDATE products
      SET name = $1, price = $2, category = $3
      WHERE id = $4
    `, [product.name, product.price, product.category, product.id]);
  }

  async delete(id: string): Promise<void> {
    await this.database.query(`
      DELETE FROM products
      WHERE id = $1
    `, [id]);
  }
}