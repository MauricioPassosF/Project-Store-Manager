const connection = require('./connection');

// const camelize = (arrayFromDB) => {
//   const arrayCamelized = arrayFromDB
//   .map((_object, index, array) => Object.values(array)[index]);
//   return arrayCamelized;
// };

const createNewData = (id, name) => ({ id, name });

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
  // console.log(insertId);
  return createNewData(insertId, reqName);
};

module.exports = {
  getAll,
  getById,
  insert,
};