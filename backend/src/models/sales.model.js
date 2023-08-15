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

const getbyId = async (reqId) => {
  const [[product]] = await connection.execute(
  `SELECT S.date,
  SP.product_id,
  SP.quantity 
  FROM sales_products AS SP INNER JOIN sales AS SON SP.sale_id = S.id
  WHERE SP.sale_id = ?;`,
    [reqId],
  );
  return product;
};

module.exports = {
  getAll,
  getbyId,
};
