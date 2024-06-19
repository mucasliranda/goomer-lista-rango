import Restaurant from "../../../domain/models/restaurant";
import { RestaurantRepository } from "../../../domain/repositories/restaurantRepository";

export default class GetRestaurant {
  constructor(private restaurantRepository: RestaurantRepository) {}

  async execute(id: string): Promise<Restaurant | null> {
    return await this.restaurantRepository.getById(id);
  }
}