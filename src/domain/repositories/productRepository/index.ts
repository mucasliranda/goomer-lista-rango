import { Product } from "../../models/product";

export abstract class ProductRepository {
  abstract getAll(restaurantId: string): Promise<Array<Product>>;
  abstract create(product: Product): Promise<void>;
  abstract update(product: Product): Promise<void>;
  abstract delete(id: string): Promise<void>;
}