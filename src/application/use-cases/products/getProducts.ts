import { Product } from "../../../domain/models/product";
import { ProductRepository } from "../../../domain/repositories/productRepository";

export default class GetProducts {
  constructor(private productRepository: ProductRepository) {}

  async execute(restaurantId: string): Promise<Array<Product>> {
    return await this.productRepository.getAll(restaurantId);
  }
}