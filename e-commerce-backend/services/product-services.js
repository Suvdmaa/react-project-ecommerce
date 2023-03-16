import { pool } from "../config/myssql-config.js";

export async function getAllProducts() {
  const [rows] = await pool.query(`select * from products`);
  await Promise.all(
    rows.map(async (row) => {
      const descriptions = await getDescription(row.id);
      const reviews = await getReviews(row.id);
      const images = await getImage(row.id);
      const size = await getSize(row.id);
      const color = await getColor(row.id);
      row.description = descriptions.map((d) => d.description);
      row.review = reviews;
      row.imgUrl = images;
      row.size = size.map((c) => c.size);
      row.color = color.map((c) => c.color);
    })
  );
  return rows;
}

export async function search(keyword) {
  const [rows] = await pool.query(
    `select * from products where title like '%${keyword}%'`
  );
  await Promise.all(
    rows.map(async (row) => {
      console.log(row);
      const descriptions = await getDescription(row.id);
      const reviews = await getReviews(row.id);
      const images = await getImage(row.id);
      const size = await getSize(row.id);
      const color = await getColor(row.id);
      row.description = descriptions.map((d) => d.description);
      row.review = reviews;
      row.imgUrl = images;
      row.size = size.map((c) => c.size);
      row.color = color.map((c) => c.color);
      console.log(descriptions);
    })
  );
  return rows[0];
}

export async function getDescription(productId) {
  const [rows] = await pool.query(
    `select * from product_description where product_id=?`,
    [productId]
  );
  return rows;
}

export async function getReviews(productId) {
  const [rows] = await pool.query(
    `select customer, review from product_reviews where product_id = ?`,
    [productId]
  );
  return rows;
}

export async function getImage(productId) {
  const [rows] = await pool.query(
    `select original, thumbnail from product_images where product_id =?`,
    [productId]
  );
  return rows;
}

export async function getSize(productId) {
  const [rows] = await pool.query(
    `select * from product_size ps LEFT JOIN size s ON ps.size_id=s.id where product_id =?`,
    [productId]
  );
  return rows;
}

export async function getColor(productId) {
  const [rows] = await pool.query(
    `select color from product_colors pc LEFT JOIN color c ON c.id=pc.color_id where product_id=?`,
    [productId]
  );
  return rows;
}
