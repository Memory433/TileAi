import { drizzle } from 'drizzle-orm/node-postgres';
import pkg from 'pg';
const { Pool } = pkg;
import * as schema from '@shared/schema';

// Create a PostgreSQL pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Create a drizzle database instance with all our schema tables
export const db = drizzle(pool, { schema });