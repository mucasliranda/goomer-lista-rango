import { describe } from "node:test";
import { beforeEach, expect, it } from "vitest";
import Hour from "../../../domain/models/hour";
import CreateRestaurant from "./createRestaurant";
import { DatabaseRestaurantRepository } from "../../../domain/repositories/restaurantRepository/databaseRestaurantRepository";
import { setupDatabase, truncateDatabase } from "../../../infraestructure/database/setup";
import Restaurant from "../../../domain/models/restaurant";
import GetRestaurant from "./getRestaurant";
import UpdateRestaurant from "./updateRestaurant";

describe('Update Restaurant Use Case', () => {
  const databaseRestaurantRepository = new DatabaseRestaurantRepository();
  const createRestaurant = new CreateRestaurant(databaseRestaurantRepository);
  const getRestaurant = new GetRestaurant(databaseRestaurantRepository);
  const updateRestaurant = new UpdateRestaurant(databaseRestaurantRepository);
  
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

  beforeEach(async () => {
    await setupDatabase();

    await truncateDatabase();

    await createRestaurant.execute(Restaurant.create(restaurantData));
  });
  
  it('should update a Restaurant', async () => {
    const restaurant = Restaurant.create({
      ...restaurantData,
      name: "Nome do Restaurante Atualizado",
      address: "Endereço do Restaurante Atualizado",
    });

    await updateRestaurant.execute(restaurant);

    const updatedRestaurant = await getRestaurant.execute("1");

    expect(updatedRestaurant).not.toBeNull();
    expect(updatedRestaurant?.name).toEqual("Nome do Restaurante Atualizado");
    expect(updatedRestaurant?.address).toEqual("Endereço do Restaurante Atualizado");
    expect(updatedRestaurant?.hours).toEqual(restaurant.hours);
  });
});