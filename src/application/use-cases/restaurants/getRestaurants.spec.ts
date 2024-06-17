import { DatabaseRestaurantRepository } from "../../../domain/repositories/restaurantRepository/databaseRestaurantRepository";
import { beforeAll, describe, expect, it } from "vitest";
import GetRestaurants from "./getRestaurants";
import { setupDatabase } from "../../../infraestructure/database/setup";
import Restaurant from "../../../domain/models/restaurant";
import Hour from "../../../domain/models/hour";

describe('Get Restaurants Use Case', () => {
  const databaseRestaurantRepository = new DatabaseRestaurantRepository();
  const getRestaurants = new GetRestaurants(databaseRestaurantRepository);

  beforeAll(async () => {
    await setupDatabase();
    
    await databaseRestaurantRepository.create(Restaurant.create({
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
    }));

    await databaseRestaurantRepository.create({
      id: '2',
      name: 'Restaurant 2',
      address: 'Address 2',
      hours: []
    });
  });

  it('should return a list of Restaurants', async () => {
    const restaurants = await getRestaurants.execute();

    restaurants.forEach(restaurant => {
      expect(restaurant).toBeInstanceOf(Restaurant);
    });
  });
});