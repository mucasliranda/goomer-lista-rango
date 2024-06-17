import { ProductRepository } from '../../../domain/repositories/productRepository';

export default class DeleteProduct {
  constructor(private productRepository: ProductRepository) {}

  async execute(id: string): Promise<void> {
    await this.productRepository.delete(id);
  }
}