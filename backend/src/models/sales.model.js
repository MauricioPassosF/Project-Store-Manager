// const connection = require('./connection');

// const getAll = async () => {
//   const [products] = await connection.execute(
//     'SELECT * FROM products ORDER BY id ASC;',
//   );
//   return products;
// };

// const getbyId = async (reqId) => {
//   const [[product]] = await connection.execute('SELECT * FROM products WHERE id = ?', [reqId]);
//   return product;
// };