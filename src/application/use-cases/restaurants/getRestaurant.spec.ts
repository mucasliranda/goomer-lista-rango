import { describe } from "node:test";
import { beforeEach, expect, it } from "vitest";
import { setupDatabase, truncateDatabase } from "../../../infraestructure/database/setup";
import { DatabaseRestaurantRepository } from "../../../domain/repositories/restaurantRepository/databaseRestaurantRepository";
import Restaurant from "../../../domain/models/restaurant";
import GetRestaurant from "./getRestaurant";
import Hour from "../../../domain/models/hour";

describe('Get Restaurant Use Case', () => {
  const databaseRestaurantRepository = new DatabaseRestaurantRepository();
  const getRestaurant = new GetRestaurant(databaseRestaurantRepository);
  const restaurantData = Restaurant.create({
    id: '1',
    name: 'Restaurant 1',
    address: 'Address 1',
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
    ]
  });

  beforeEach(async () => {
    await setupDatabase();

    await truncateDatabase();
    
    await databaseRestaurantRepository.create(restaurantData);
  });

  it('should return a Restaurant by id', async () => {
    const restaurant = await getRestaurant.execute(restaurantData.id);

    expect(restaurant).toStrictEqual(restaurantData);
  });
});