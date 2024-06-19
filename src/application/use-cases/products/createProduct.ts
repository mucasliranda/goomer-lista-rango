import { Product } from '../../../domain/models/product';
import { ProductRepository } from '../../../domain/repositories/productRepository';

export default class CreateProduct {
  constructor(private productRepository: ProductRepository) {}

  async execute(product: Product): Promise<void> {
    await this.productRepository.create(product);
  }
}