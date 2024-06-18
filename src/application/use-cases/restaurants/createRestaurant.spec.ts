import { DatabaseRestaurantRepository } from "../../../domain/repositories/restaurantRepository/databaseRestaurantRepository";
import Restaurant from "../../../domain/models/restaurant";
import CreateRestaurant from "./createRestaurant";
import Hour from "../../../domain/models/hour";
import { beforeEach, describe, expect, it } from "vitest";
import { setupDatabase, truncateDatabase } from "../../../infraestructure/database/setup";

describe('Create Restaurant Use Case', () => {
  const databaseRestaurantRepository = new DatabaseRestaurantRepository();
  const createRestaurant = new CreateRestaurant(databaseRestaurantRepository);
  
  const restaurantData = {
    name: "Nome do Restaurante",
    address: "Endereço do Restaurante",
    hours: [
      Hour.create({
        start: "08:00",
        end: "18:00",
        days: [1, 2, 3, 4, 5]
      }),
      Hour.create({
        start: "08:00",
        end: "12:00",
        days: [6, 0]
      }),
    ]
  }

  beforeEach(async () => {
    await setupDatabase();

    await truncateDatabase();
  });

  it('should create a new restaurant with success', () => {
    const restaurant = Restaurant.create({
      name: restaurantData.name,
      address: restaurantData.address,
      hours: restaurantData.hours
    });

    expect(async () => await createRestaurant.execute(restaurant)).not.toThrow();
  });
});