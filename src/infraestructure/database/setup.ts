import { db } from "../orm";

export async function setupDatabase() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS restaurants (
      id VARCHAR(255) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      address VARCHAR(255) NOT NULL
    )
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS restaurants_hours (
      id VARCHAR(255) PRIMARY KEY,
      start VARCHAR(255) NOT NULL,
      "end" VARCHAR(255) NOT NULL,
      days INT[] NOT NULL,

      restaurant_id VARCHAR(255) REFERENCES restaurants(id) ON DELETE CASCADE
    )
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS products (
      id VARCHAR(255) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      price FLOAT NOT NULL,
      category VARCHAR(255) NOT NULL,

      restaurant_id VARCHAR(255) REFERENCES restaurants(id) ON DELETE CASCADE
    )
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS sales (
      id VARCHAR(255) PRIMARY KEY,
      price FLOAT NOT NULL,
      description VARCHAR(255),

      product_id VARCHAR(255) REFERENCES products(id) ON DELETE CASCADE
    )
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS sales_hours (
      id VARCHAR(255) PRIMARY KEY,
      start VARCHAR(255) NOT NULL,
      "end" VARCHAR(255) NOT NULL,
      days INT[] NOT NULL,

      sale_id VARCHAR(255) REFERENCES sales(id) ON DELETE CASCADE
    )
  `);

  await db.query(`
    TRUNCATE TABLE restaurants CASCADE;
  `)
}