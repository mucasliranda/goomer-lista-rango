import { PGlite } from "@electric-sql/pglite";
import { env } from '../config/env'

const databaseDirectory = env.NODE_ENV === 'test' ? undefined : './database';

export const db = new PGlite(databaseDirectory);