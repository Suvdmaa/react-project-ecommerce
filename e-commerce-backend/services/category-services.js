import { pool } from "../config/myssql-config.js";

export async function getPopularCategories() {
  const [rows] = await pool.query(`select * from popular_category`);
  return rows;
}
