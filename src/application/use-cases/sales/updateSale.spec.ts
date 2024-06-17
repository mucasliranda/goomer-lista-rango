import { DatabaseRestaurantRepository } from "../../../domain/repositories/restaurantRepository/databaseRestaurantRepository";
import { DatabaseProductRepository } from "../../../domain/repositories/productRepository/databaseProductRepository";
import { DatabaseSaleRepository } from "../../../domain/repositories/saleRepository/databaseSaleRepository";
import { setupDatabase } from "../../../infraestructure/database/setup";
import CreateRestaurant from "../restaurants/createRestaurant";
import Restaurant from "../../../domain/models/restaurant";
import { beforeEach, describe, expect, it } from "vitest";
import { Product } from "../../../domain/models/product";
import CreateProduct from "../products/createProduct";
import { Sale } from "../../../domain/models/sale";
import GetProducts from "../products/getProducts";
import CreateSale from "./createSale";
import UpdateSale from "./updateSale";

describe("Update Sale", () => {
  const databaseRestaurantRepository = new DatabaseRestaurantRepository();
  const createRestaurant = new CreateRestaurant(databaseRestaurantRepository);

  const databaseProductRepository = new DatabaseProductRepository();
  const createProduct = new CreateProduct(databaseProductRepository);
  const getProducts = new GetProducts(databaseProductRepository);

  const databaseSaleRepository = new DatabaseSaleRepository();
  const createSale = new CreateSale(databaseSaleRepository);
  const updateSale = new UpdateSale(databaseSaleRepository);

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

  const saleData = {
    id: "saleId",
    productId: "productId",
    price: 8.00,
    description: "Sale description",
    hours: [
      {
        start: "08:00",
        end: "18:00",
        days: [1, 2, 3, 4, 5],
      },
    ],
  };

  beforeEach(async () => {
    await setupDatabase();

    await createRestaurant.execute(Restaurant.create(restaurantData));
    await createProduct.execute(Product.create(productData));
    await createSale.execute(Sale.create(saleData));
  });

  it("should update a sale", async () => {
    const updatedSaleData = Sale.create({
      ...saleData,
      price: 5.00,
      hours: [
        {
          start: "14:00",
          end: "18:00",
          days: [1, 2, 3],
        },
      ],
    });

    await updateSale.execute(updatedSaleData);

    const products = await getProducts.execute(restaurantData.id);

    expect(products.length).toBe(1);
    expect(products[0].sale).toStrictEqual(updatedSaleData);
  });
});