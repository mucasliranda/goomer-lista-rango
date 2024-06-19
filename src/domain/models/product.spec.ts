import { describe } from "node:test";
import { expect, it } from "vitest";
import { Product } from "./product";

describe('Product', () => {
  const productData = {
    restaurantId: '456',
    name: 'Nome do Produto',
    price: 10,
    category: 'Grupo do Produto',
  };

  it('should create a new product with success', () => {
    const product = Product.create({
      restaurantId: productData.restaurantId,
      name: productData.name,
      price: productData.price,
      category: productData.category,
    });

    expect(product).toBeInstanceOf(Product);
  });

  it('should throw a validation error when trying to create a product without a restaurantId', () => {
    expect(() => Product.create({
      restaurantId: '',
      name: productData.name,
      price: productData.price,
      category: productData.category,
    })).toThrow();
  });

  it('should throw a validation error when trying to create a product without a name', () => {
    expect(() => Product.create({
      restaurantId: productData.restaurantId,
      name: '',
      price: productData.price,
      category: productData.category,
    })).toThrow();
  });

  it('should throw a validation error when trying to create a product without a price', () => {
    expect(() => Product.create({
      restaurantId: productData.restaurantId,
      name: productData.name,
      price: 0,
      category: productData.category,
    })).toThrow();
  });

  it('should throw a validation error when trying to create a product without a category', () => {
    expect(() => Product.create({
      restaurantId: productData.restaurantId,
      name: productData.name,
      price: productData.price,
      category: '',
    })).toThrow();
  });

  it('should create a new product with a sale', () => {
    const product = Product.create({
      restaurantId: productData.restaurantId,
      name: productData.name,
      price: productData.price,
      category: productData.category,
      sale: {
        price: 5,
        description: 'Sale description',
        hours: [
          {
            start: '08:00',
            end: '18:00',
            days: [1, 2, 3, 4, 5],
          },
        ],
      },
    });

    expect(product.sale).toBeDefined();
  });
});