import Restaurant from "../../models/restaurant";

export abstract class RestaurantRepository {
  abstract getAll(): Promise<Array<Restaurant>>;
  abstract getById(id: string): Promise<Restaurant | null>;
  abstract create(restaurant: Restaurant): Promise<void>;
  abstract update(restaurant: Restaurant): Promise<void>;
  abstract delete(id: string): Promise<void>;
}