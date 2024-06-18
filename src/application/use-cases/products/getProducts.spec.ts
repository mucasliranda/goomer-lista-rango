import { DatabaseRestaurantRepository } from "../../../domain/repositories/restaurantRepository/databaseRestaurantRepository";
import { DatabaseProductRepository } from "../../../domain/repositories/productRepository/databaseProductRepository";
import { setupDatabase, truncateDatabase } from "../../../infraestructure/database/setup";
import CreateRestaurant from "../restaurants/createRestaurant";
import Restaurant from "../../../domain/models/restaurant";
import { Product } from "../../../domain/models/product";
import { beforeEach, describe, expect, it } from "vitest";
import CreateProduct from "./createProduct";
import GetProducts from "./getProducts";

describe('Get Products Use Case', () => {
  const databaseRestaurantRepository = new DatabaseRestaurantRepository();
  const createRestaurant = new CreateRestaurant(databaseRestaurantRepository);

  const databaseProductRepository = new DatabaseProductRepository();
  const createProduct = new CreateProduct(databaseProductRepository);
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

  it('should get all products with success', async () => {
    const products = await getProducts.execute("restaurantId");

    expect(products.length).toBe(1);
    expect(products[0].id).toBe(productData.id);
    expect(products[0].restaurantId).toBe(productData.restaurantId);
    expect(products[0].name).toBe(productData.name);
    expect(products[0].price).toBe(productData.price);
    expect(products[0].category).toBe(productData.category);
  });

  it('should not get products from a restaurant that does not exist', async () => {
    const products = await getProducts.execute("restaurantId2");

    expect(products.length).toBe(0);
  });
});