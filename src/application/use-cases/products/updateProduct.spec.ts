import { beforeEach, describe, expect, it } from "vitest";
import { DatabaseRestaurantRepository } from "../../../domain/repositories/restaurantRepository/databaseRestaurantRepository";
import CreateRestaurant from "../restaurants/createRestaurant";
import { DatabaseProductRepository } from "../../../domain/repositories/productRepository/databaseProductRepository";
import CreateProduct from "./createProduct";
import { setupDatabase, truncateDatabase } from "../../../infraestructure/database/setup";
import Restaurant from "../../../domain/models/restaurant";
import { Product } from "../../../domain/models/product";
import UpdateProduct from "./updateProduct";
import GetProducts from "./getProducts";

describe('Update Product Use Case', () => {
  const databaseRestaurantRepository = new DatabaseRestaurantRepository();
  const createRestaurant = new CreateRestaurant(databaseRestaurantRepository);

  const databaseProductRepository = new DatabaseProductRepository();
  const createProduct = new CreateProduct(databaseProductRepository);
  const updateProduct = new UpdateProduct(databaseProductRepository);
  const getProducts = new GetProducts(databaseProductRepository);

  const restaurantData = {
    id: "restaurantId",
    name: "Nome do Restaurante",
    address: "Endereço do Restaurante",
  }

  const productData = {
    id: "productId",
    restaurantId: "restaurantId",
    name: "Nome do Produto",
    price: 10.00,
    category: "Pizzaria",
  }

  beforeEach(async () => {
    await setupDatabase();

    await truncateDatabase();

    await createRestaurant.execute(Restaurant.create(restaurantData));
    await createProduct.execute(Product.create(productData));
  });

  it('should update a product with success', () => {
    const product = Product.create({ ...productData, name: 'Novo Nome' });

    expect(async () => await updateProduct.execute(product)).not.toThrow();
  });

  it('should update fields of a product with success', async () => {
    const newProduct = Product.create({ ...productData, name: 'Novo Nome', price: 20.00, category: 'Lanchonete' });
    await updateProduct.execute(newProduct);
    const products = await getProducts.execute(restaurantData.id);
  
    expect(products).toStrictEqual([
      newProduct
    ]);
  });
});