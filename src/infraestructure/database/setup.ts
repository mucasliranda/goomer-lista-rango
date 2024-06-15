import { db } from "../orm";

export async function setupDatabase() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS restaurants (
      id TEXT PRIMARY KEY,
      name TEXT,
      address TEXT,
      hours TEXT
    )
  `);
}