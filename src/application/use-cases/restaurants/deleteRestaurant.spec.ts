import { describe } from "node:test";
import { beforeAll, beforeEach, expect, it } from "vitest";
import Hour from "../../../domain/models/hour";
import CreateRestaurant from "./createRestaurant";
import { DatabaseRestaurantRepository } from "../../../domain/repositories/restaurantRepository/databaseRestaurantRepository";
import { setupDatabase } from "../../../infraestructure/database/setup";
import Restaurant from "../../../domain/models/restaurant";
import GetRestaurant from "./getRestaurant";
import GetRestaurants from "./getRestaurants";
import DeleteRestaurant from "./deleteRestaurant";

describe('Delete Restaurant Use Case', () => {
  const databaseRestaurantRepository = new DatabaseRestaurantRepository();
  const createRestaurant = new CreateRestaurant(databaseRestaurantRepository);
  const deleteRestaurant = new DeleteRestaurant(databaseRestaurantRepository);
  const getRestaurants = new GetRestaurants(databaseRestaurantRepository);
  const getRestaurant = new GetRestaurant(databaseRestaurantRepository);
  
  const restaurantData = {
    id: "1",
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

  const restaurantData2 = {
    id: "2",
    name: "Nome do Restaurante 2",
    address: "Endereço do Restaurante 2",
    hours: [
      Hour.create({
        start: "08:00",
        end: "18:00",
        days: [1, 2, 3, 4, 5]
      })
    ]
  }

  beforeEach(async () => {
    await setupDatabase();

    await createRestaurant.execute(Restaurant.create(restaurantData));

    await createRestaurant.execute(Restaurant.create(restaurantData2));
  });
  
  it('should delete a Restaurant', async () => {
    await deleteRestaurant.execute(restaurantData.id);

    const restaurant = await getRestaurant.execute(restaurantData.id);
    const restaurants = await getRestaurants.execute();

    expect(restaurant).toBeNull();
    expect(restaurants).toHaveLength(1);
  });

  it('should not delete a Restaurant that does not exist', async () => {
    await deleteRestaurant.execute("3");

    const restaurants = await getRestaurants.execute();

    expect(restaurants).toHaveLength(2);
  });

  it('should not delete another Restaurant', async () => {
    await deleteRestaurant.execute("2");

    const restaurant = await getRestaurant.execute(restaurantData.id);

    expect(restaurant).not.toBeNull();
  });
});