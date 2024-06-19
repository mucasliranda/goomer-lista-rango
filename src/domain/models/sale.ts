import { ValidationError } from "../errors/validation-error";
import Hour from "./hour";

interface Input {
  id?: string;
  productId: string;
  price: number;
  description: string;
  hours: {
    start: string;
    end: string;
    days: number[];
  }[];
}

export class Sale {
  constructor(
    readonly id: string,
    readonly productId: string,
    readonly price: number,
    readonly description: string,
    readonly hours: Array<Hour>
  ) {
    if (!this.id) throw new ValidationError('Sale id is required');
    if (this.price < 0) throw new ValidationError('Sale price must be greater than 0');
    if (!this.description) throw new ValidationError('Sale description is required');
  }

  static create({ id, productId, price, description, hours = [] }: Input) {
    return new Sale(
      id || crypto.randomUUID(),
      productId,
      price,
      description,
      hours.map(hour => Hour.create({
        ...hour
      }))
    );
  }
}