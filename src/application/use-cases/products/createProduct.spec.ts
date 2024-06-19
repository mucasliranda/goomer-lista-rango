import { DatabaseRestaurantRepository } from "../../../domain/repositories/restaurantRepository/databaseRestaurantRepository";
import { DatabaseProductRepository } from "../../../domain/repositories/productRepository/databaseProductRepository";
import { setupDatabase, truncateDatabase } from "../../../infraestructure/database/setup";
import CreateRestaurant from "../restaurants/createRestaurant";
import Restaurant from "../../../domain/models/restaurant";
import { Product } from "../../../domain/models/product";
import { beforeEach, describe, expect, it } from "vitest";
import CreateProduct from "./createProduct";

describe('Create Product Use Case', () => {
  const databaseRestaurantRepository = new DatabaseRestaurantRepository();
  const createRestaurant = new CreateRestaurant(databaseRestaurantRepository);

  const databaseProductRepository = new DatabaseProductRepository();
  const createProduct = new CreateProduct(databaseProductRepository);

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
  });

  it('should create a new product with success', () => {
    const product = Product.create(productData);

    expect(async () => await createProduct.execute(product)).not.toThrow();
  });

  it('should not create a new product with invalid restaurant', () => {
    const product = Product.create({ ...productData, restaurantId: 'invalidId' });

    expect(async () => await createProduct.execute(product)).rejects.toThrow();
  });
});