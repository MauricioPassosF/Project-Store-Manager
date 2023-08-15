const { productsServices } = require('../services');
const { mapStatusHTTP } = require('../utils/statusByHTTP');

const getAll = async (_req, res) => {
  const { data, status } = await productsServices.getAll();
  return res.status(mapStatusHTTP(status)).json(data);
};

const getbyId = async (req, res) => {
  const { id } = req.params;
  const { data, status, message } = await productsServices.getbyId(id);
  return res.status(mapStatusHTTP(status)).json(data || message);
};

const insert = async (req, res) => {
  const { name } = req.body;
  const { data, status } = await productsServices.insert(name);
  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  getAll,
  getbyId,
  insert,
};