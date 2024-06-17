import { SaleRepository } from '../../../domain/repositories/saleRepository';

export default class DeleteSale {
  constructor(private saleRepository: SaleRepository) {}

  async execute(id: string): Promise<void> {
    await this.saleRepository.delete(id);
  }
}