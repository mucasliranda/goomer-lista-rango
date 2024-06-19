import { SaleRepository } from '../../../domain/repositories/saleRepository';
import { Sale } from '../../../domain/models/sale';

export default class UpdateSale {
  constructor(private saleRepository: SaleRepository) {}

  async execute(sale: Sale): Promise<void> {
    await this.saleRepository.update(sale);
  }
}