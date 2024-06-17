import { beforeEach, describe, expect, it } from "vitest";
import { DatabaseRestaurantRepository } from "../../../domain/repositories/restaurantRepository/databaseRestaurantRepository";
import CreateRestaurant from "../restaurants/createRestaurant";
import { DatabaseProductRepository } from "../../../domain/repositories/productRepository/databaseProductRepository";
import CreateProduct from "./createProduct";
import { setupDatabase } from "../../../infraestructure/database/setup";
import Restaurant from "../../../domain/models/restaurant";
import { Product } from "../../../domain/models/product";
import UpdateProduct from "./updateProduct";
import GetProducts from "./getProducts";

describe('Delete Product Use Case', () => {
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

    await createRestaurant.execute(Restaurant.create(restaurantData));
    await createProduct.execute(Product.create(productData));
  });

  it('should not throw deleting a product', () => {
    expect(async () => await databaseProductRepository.delete(productData.id)).not.toThrow();
  });

  it('should delete a product with success', async () => {
    await databaseProductRepository.delete(productData.id);
    const products = await getProducts.execute(restaurantData.id);
  
    expect(products).toStrictEqual([]);
  });

  it('should delete just the product with the id passed', async () => {
    const newProductData = {
      id: "newProductId",
      restaurantId: "restaurantId",
      name: "Nome do Produto 2",
      price: 20.00,
      category: "Pizzaria",
    }

    await createProduct.execute(Product.create(newProductData));
    await databaseProductRepository.delete(productData.id);
    const products = await getProducts.execute(restaurantData.id);
  
    expect(products).toStrictEqual([
      Product.create(newProductData)
    ]);
  });
});