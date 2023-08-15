const connection = require('./connection');

// const camelize = (arrayFromDB) => {
//   const arrayCamelized = arrayFromDB
//   .map((_object, index, array) => Object.values(array)[index]);
//   return arrayCamelized;
// };

const getAll = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM products ORDER BY id ASC;',
  );
  return products;
};

const getbyId = async (reqId) => {
  const [[product]] = await connection.execute('SELECT * FROM products WHERE id = ?', [reqId]);
  return product;
};

module.exports = {
  getAll,
  getbyId,
};