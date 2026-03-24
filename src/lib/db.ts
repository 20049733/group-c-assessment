import { Pool } from 'pg';

// Using a Singleton Pool for PostgreSQL connections
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL || 'postgresql://postgres:postgres@localhost:5432/noelgroup',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

export default {
  /**
   * Run a query against the PostgreSQL pool.
   * @param text The SQL query string (use $1, $2 for parameters)
   * @param params An array of values to bind
   */
  query: (text: string, params?: any[]) => pool.query(text, params),
  
  /**
   * Get a single result or null.
   */
  async getOne(text: string, params?: any[]) {
    const { rows } = await pool.query(text, params);
    return rows[0] || null;
  },

  /**
   * Get all results.
   */
  async getAll(text: string, params?: any[]) {
    const { rows } = await pool.query(text, params);
    return rows;
  },

  /**
   * Run an INSERT/UPDATE and return results (e.g. for RETURNING clause)
   */
  async run(text: string, params?: any[]) {
    return pool.query(text, params);
  }
};
