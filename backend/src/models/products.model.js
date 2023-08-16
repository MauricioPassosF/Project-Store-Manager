const connection = require('./connection');

const getAll = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM products ORDER BY id ASC;',
  );
  return products;
};

const getById = async (reqId) => {
  const [[product]] = await connection.execute('SELECT * FROM products WHERE id = ?', [reqId]);
  return product;
};

const insert = async (reqName) => {
  const [{ insertId }] = await connection
  .execute('INSERT INTO products (name) value (?);', [reqName]);
  return { id: insertId, name: reqName };
};

const update = async (name, id) => {
  await connection
  .execute('UPDATE products SET name = ? WHERE id = ?;', [name, id]);
  return { id, name };
};

const deleteById = async (id) => {
  await connection
  .execute('DELETE FROM products WHERE id = ?;', [id]);
};

module.exports = {
  getAll,
  getById,
  insert,
  update,
  deleteById,
};