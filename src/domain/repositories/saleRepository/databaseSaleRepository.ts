import { NotFoundError } from "../../errors/not-found-error";
import { db } from "../../../infraestructure/orm";
import { Sale } from "../../models/sale";
import { SaleRepository } from "./";

export class DatabaseSaleRepository implements SaleRepository {
  constructor(private database = db) {}

  async create(sale: Sale): Promise<void> {
    try {
      await this.database.query(`
        INSERT INTO sales (id, product_id, price, description)
        VALUES ($1, $2, $3, $4)
      `, [sale.id, sale.productId, sale.price, sale.description]);

      sale.hours.forEach(async (hour) => {
        await this.database.query(`
          INSERT INTO sales_hours (id, start, "end", days, sale_id)
          VALUES ($1, $2, $3, $4, $5)
        `, [hour.id, hour.start, hour.end, hour.days, sale.id]);
      });
    }
    catch (error: any) {
      if (error.constraint === 'sales_product_id_fkey') {
        throw new NotFoundError('Product not found');
      }
    }
  }

  async update(sale: Sale): Promise<void> {
    await this.database.query(`
      UPDATE sales
      SET product_id = $2, price = $3, description = $4
      WHERE id = $1
    `, [sale.id, sale.productId, sale.price, sale.description]);

    await this.database.query(`
      DELETE FROM sales_hours
      WHERE sale_id = $1
    `, [sale.id]);

    sale.hours.forEach(async (hour) => {
      await this.database.query(`
        INSERT INTO sales_hours (id, start, "end", days, sale_id)
        VALUES ($1, $2, $3, $4, $5)
      `, [hour.id, hour.start, hour.end, hour.days, sale.id]);
    });
  }

  async delete(id: string): Promise<void> {
    await this.database.query(`
      DELETE FROM sales WHERE id = $1
    `, [id]);
  }
}