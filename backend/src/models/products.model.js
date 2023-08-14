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

module.exports = {
  getAll,
};