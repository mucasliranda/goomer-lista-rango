import { describe, expect, it } from "vitest";
import Restaurant from "./restaurant";
import Hour from "./hour";

describe('Restaurant', () => {
  const restaurantData = {
    name: 'Nome do Restaurante',
    address: 'Endereço do Restaurante',
    hours: [
      Hour.create({
        start: '08:00',
        end: '18:00',
        days: [1, 2, 3, 4, 5],
      }),
      Hour.create({
        start: '08:00',
        end: '12:00',
        days: [6, 0],
      }),
    ],
  };

  it('should create a new restaurant with success', () => {
    const restaurant = Restaurant.create({
      name: restaurantData.name,
      address: restaurantData.address,
      hours: restaurantData.hours,
    });

    expect(restaurant).toBeInstanceOf(Restaurant);
  });

  it('should throw a validation error when trying to create a restaurant without a name', () => {
    expect(() => Restaurant.create({
      name: '',
      address: restaurantData.address,
      hours: restaurantData.hours,
    })).toThrow();
  });

  it('should throw a validation error when trying to create a restaurant without an address', () => {
    expect(() => Restaurant.create({
      name: restaurantData.name,
      address: '',
      hours: restaurantData.hours,
    })).toThrow();
  });
});