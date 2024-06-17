import { describe } from "node:test";
import { beforeAll, expect, it } from "vitest";
import Hour from "../../../domain/models/hour";
import CreateRestaurant from "./createRestaurant";
import { DatabaseRestaurantRepository } from "../../../domain/repositories/restaurantRepository/databaseRestaurantRepository";
import { setupDatabase } from "../../../infraestructure/database/setup";
import Restaurant from "../../../domain/models/restaurant";
import GetRestaurant from "./getRestaurant";

describe('Update Restaurant Use Case', () => {
  const databaseRestaurantRepository = new DatabaseRestaurantRepository();
  const createRestaurant = new CreateRestaurant(databaseRestaurantRepository);
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

  beforeAll(async () => {
    await setupDatabase();

    await createRestaurant.execute(Restaurant.create(restaurantData));
  });
  
  it('should update a Restaurant', async () => {
    const restaurant = Restaurant.create({
      ...restaurantData,
      name: "Nome do Restaurante Atualizado",
      address: "Endereço do Restaurante Atualizado",
    });

    await databaseRestaurantRepository.update(restaurant);

    const updatedRestaurant = await getRestaurant.execute("1");

    expect(updatedRestaurant).not.toBeNull();
    expect(updatedRestaurant?.name).toEqual("Nome do Restaurante Atualizado");
    expect(updatedRestaurant?.address).toEqual("Endereço do Restaurante Atualizado");
    expect(updatedRestaurant?.hours).toEqual(restaurant.hours);
  });
});