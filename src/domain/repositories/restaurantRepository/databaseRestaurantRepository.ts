import { RestaurantRepository } from "./index";
import { db } from "../../../infraestructure/orm";
import Restaurant from "../../models/restaurant";

export class DatabaseRestaurantRepository implements RestaurantRepository {
  constructor(private database = db) {}

  async getAll(): Promise<Array<Restaurant>> {
    const { rows: restaurants } = await this.database.query<Restaurant>(`
      SELECT 
        r.id, 
        r.name, 
        r.address, 

        COALESCE(json_agg(json_build_object(
          'id', h.id, 
          'start', h.start, 
          'end', h.end, 
          'days', h.days
        )) FILTER (WHERE h.id IS NOT NULL), '[]') AS hours
      FROM 
        restaurants r
      LEFT JOIN 
        restaurants_hours h ON r.id = h.restaurant_id
      GROUP BY 
        r.id;
    `);
    
    return restaurants.map(restaurant => Restaurant.create({
      ...restaurant
    }));
  }

  async getById(id: string): Promise<Restaurant | null> {
    const { rows: restaurants } = await this.database.query<Restaurant>(`
      SELECT 
        r.id, 
        r.name, 
        r.address, 
        COALESCE(json_agg(json_build_object(
          'id', h.id, 
          'start', h.start, 
          'end', h.end, 
          'days', h.days
        )) FILTER (WHERE h.id IS NOT NULL), '[]') AS hours
      FROM 
        restaurants r
      LEFT JOIN 
        restaurants_hours h ON r.id = h.restaurant_id
      WHERE 
        r.id = $1
      GROUP BY 
        r.id;
    `, [id]);

    if (!restaurants.length) return null;

    return Restaurant.create({
      ...restaurants[0]
    });
  }

  async create(restaurant: Restaurant): Promise<void> {
    await this.database.query(`
      INSERT INTO restaurants (id, name, address)
      VALUES ($1, $2, $3)
    `, [restaurant.id, restaurant.name, restaurant.address]);

    restaurant.hours.forEach(async (hour) => {
      await this.database.query(`
        INSERT INTO restaurants_hours (id, start, "end", days, restaurant_id)
        VALUES ($1, $2, $3, $4, $5)
      `, [hour.id, hour.start, hour.end, hour.days, restaurant.id]);
    });
  }

  async update(restaurant: Restaurant): Promise<void> {
    await this.database.query(`
      UPDATE restaurants
      SET name = $2, address = $3
      WHERE id = $1
    `, [restaurant.id, restaurant.name, restaurant.address]);

    await this.database.query(`
      DELETE FROM restaurants_hours
      WHERE restaurant_id = $1
    `, [restaurant.id]);

    restaurant.hours.forEach(async (hour) => {
      await this.database.query(`
        INSERT INTO restaurants_hours (id, start, "end", days, restaurant_id)
        VALUES ($1, $2, $3, $4, $5)
      `, [hour.id, hour.start, hour.end, hour.days, restaurant.id]);
    });
  }

  async delete(id: string): Promise<void> {
    await this.database.query(`
      DELETE FROM restaurants
      WHERE id = $1
    `, [id]);
  }
}