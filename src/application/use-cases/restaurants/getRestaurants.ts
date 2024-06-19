import Restaurant from "../../../domain/models/restaurant";
import { RestaurantRepository } from "../../../domain/repositories/restaurantRepository";

export default class GetRestaurants {
  constructor(private restaurantRepository: RestaurantRepository) {}

  async execute(): Promise<Array<Restaurant>> {
    return await this.restaurantRepository.getAll();
  }
}