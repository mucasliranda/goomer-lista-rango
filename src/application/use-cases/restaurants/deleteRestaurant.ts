import { RestaurantRepository } from '../../../domain/repositories/restaurantRepository';

export default class DeleteRestaurant {
  constructor(private restaurantRepository: RestaurantRepository) {}

  async execute(id: string): Promise<void> {
    await this.restaurantRepository.delete(id);
  }
}