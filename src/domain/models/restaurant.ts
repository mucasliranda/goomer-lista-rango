import { ValidationError } from "../errors/validation-error";
import Hour from "./hour";
import { env } from '../../infraestructure/config/env'

interface Input {
  id?: string;
  name: string;
  address: string;
  hours?: {
    start: string;
    end: string;
    days: number[];
  }[];
}

const localUrl = `http://localhost:${env.PORT}`;

export default class Restaurant {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly address: string,
    readonly hours: Array<Hour>,
    readonly image?: string,
  ) {
    if (!this.id) throw new ValidationError('Restaurant id is required');
    if (!this.name) throw new ValidationError('Restaurant name is required');
    if (!this.address) throw new ValidationError('Restaurant address is required');
  }

  static create({ id, name, address, hours = [] }: Input) {
    return new Restaurant(
      id || crypto.randomUUID(),
      name,
      address,
      hours.map(hour => Hour.create({
        ...hour
      })),
      `${localUrl}/image/${id}`
    );
  }
}