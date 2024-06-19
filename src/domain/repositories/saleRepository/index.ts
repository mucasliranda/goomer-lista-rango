import { Sale } from "../../models/sale";

export abstract class SaleRepository {
  abstract create(sale: Sale): Promise<void>;
  abstract update(sale: Sale): Promise<void>;
  abstract delete(id: string): Promise<void>;
}