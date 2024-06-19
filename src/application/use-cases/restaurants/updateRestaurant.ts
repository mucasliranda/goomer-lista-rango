import Restaurant from "../../../domain/models/restaurant";
import { RestaurantRepository } from "../../../domain/repositories/restaurantRepository";

export default class UpdateRestaurant {
  constructor(private restaurantRepository: RestaurantRepository) {}

  async execute(restaurant: Restaurant): Promise<void> {
    return await this.restaurantRepository.update(restaurant);
  }
}