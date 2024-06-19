import { ValidationError } from "../errors/validation-error";
import { Sale } from "./sale";
import { env } from '../../infraestructure/config/env'

interface Input {
  id?: string;
  restaurantId: string;
  name: string;
  price: number;
  category: string;
  sale?: {
    id?: string;
    productId: string;
    price: number;
    description: string;
    hours: {
      start: string;
      end: string;
      days: number[];
    }[];
  };
}

const localUrl = `http://localhost:${env.PORT}`;

export class Product {
  constructor(
    readonly id: string,
    readonly restaurantId: string,
    readonly name: string,
    readonly price: number,
    readonly category: string,
    readonly sale: Sale | null,
    readonly image?: string,
  ) {
    if (!this.id) throw new ValidationError('Product id is required');
    if (!this.restaurantId) throw new ValidationError('Product restaurantId is required');
    if (!this.name) throw new ValidationError('Product name is required');
    if (!this.price) throw new ValidationError('Product price is required');
    if (!this.category) throw new ValidationError('Product category is required');
  }

  static create({ id, restaurantId, name, price, category, sale }: Input) {
    return new Product(
      id || crypto.randomUUID(),
      restaurantId,
      name,
      price,
      category,
      sale ? Sale.create(sale) : null,
      `${localUrl}/image/${id}`
    );
  }
}