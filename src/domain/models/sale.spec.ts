import { describe, expect, it } from "vitest";
import { Sale } from "./sale";

describe("Sale", () => {
  const saleData = {
    productId: "productId",
    price: 100,
    description: "Sale description",
    hours: [
      {
        start: "08:00",
        end: "18:00",
        days: [1, 2, 3, 4, 5],
      },
    ],
  };

  it("should create a new sale with success", () => {
    const sale = Sale.create({
      productId: saleData.productId,
      price: saleData.price,
      description: saleData.description,
      hours: saleData.hours,
    });
    
    expect(sale.id).toBeDefined();
    expect(sale.price).toBe(100);
    expect(sale.description).toBe("Sale description");
    expect(sale.hours[0].start).toBe("08:00");
    expect(sale.hours[0].end).toBe("18:00");
    expect(sale.hours[0].days).toEqual([1, 2, 3, 4, 5]);
  });

  it("should throw an error when creating a new sale with price under 0", () => {
    expect(() =>
      Sale.create({
        productId: saleData.productId,
        price: -1,
        description: saleData.description,
        hours: saleData.hours,
      })
    ).toThrow();
  });

  it("should throw an error when creating a new sale without description", () => {
    expect(() =>
      Sale.create({
        productId: saleData.productId,
        price: saleData.price,
        description: "",
        hours: saleData.hours,
      })
    ).toThrow();
  });
});