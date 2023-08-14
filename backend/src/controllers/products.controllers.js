const { productsServices } = require('../services');
const { mapStatusHTTP } = require('../utils/statusByHTTP');

const getAll = async (_req, res) => {
  const { data, status } = await productsServices.getAll();
  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  getAll,
};