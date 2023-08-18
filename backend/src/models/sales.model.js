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

const deleteById = async (id) => {
  await connection
  .execute('DELETE FROM sales WHERE id = ?;', [id]);
};

const updateQuantity = async ({ quantity, saleId, productId }) => {
  const [{ affectedRows }] = await connection
  .execute(`UPDATE sales_products 
  SET quantity = ? WHERE sale_id = ? AND product_id = ?`, [quantity, saleId, productId]);
  return affectedRows;
};

const getSaleDate = async (id) => {
  const [[{ date }]] = await connection.execute('SELECT date FROM sales WHERE id = ?', [id]);
  return date;
};

module.exports = {
  getAll,
  getById,
  insertSales,
  insertProductSale,
  deleteById,
  updateQuantity,
  getSaleDate,
};
