const camelize = require('camelize');
const connection = require('./connection');

const getAll = async () => {
  const [sales] = await connection.execute(
    `SELECT 
    SP.sale_id,
    S.date,
    SP.product_id, 
    SP.quantity 
    FROM sales_products AS SP INNER JOIN sales AS S ON SP.sale_id = S.id ORDER BY SP.sale_id;`,
  );
  return camelize(sales);
};

const getById = async (reqId) => {
  const [salesById] = await connection.execute(
    `SELECT S.date,
  SP.product_id,
  SP.quantity 
  FROM sales_products AS SP INNER JOIN sales AS S ON SP.sale_id = S.id
  WHERE SP.sale_id = ?;`,
    [reqId],
  );
  return camelize(salesById);
};

const insertSales = async () => {
  const [{ insertId }] = await connection.execute('INSERT INTO sales () value ();');
  return insertId;
};

const insertProductSale = async ({ productId, quantity }, id) => {
  await connection.execute(
    `INSERT INTO sales_products 
  (sale_id, product_id, quantity) 
  value (?,?,?);`,
    [id, productId, quantity],
  );
};

module.exports = {
  getAll,
  getById,
  insertSales,
  insertProductSale,
};
