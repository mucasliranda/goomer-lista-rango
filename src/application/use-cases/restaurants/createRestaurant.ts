import { RestaurantRepository } from '../../../domain/repositories/restaurantRepository';
import Restaurant from '../../../domain/models/restaurant';

export default class CreateRestaurant {
  constructor(private restaurantRepository: RestaurantRepository) {}

  async execute(restaurant: Restaurant): Promise<void> {
    await this.restaurantRepository.create(restaurant);
  }
}