const { productsServices } = require('../services');
const { mapStatusHTTP } = require('../utils/statusByHTTP');

const getAll = async (_req, res) => {
  const { data, status } = await productsServices.getAll();
  return res.status(mapStatusHTTP(status)).json(data);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { data, status } = await productsServices.getById(id);
  return res.status(mapStatusHTTP(status)).json(data);
};

const insert = async (req, res) => {
  const { name } = req.body;
  const { data, status } = await productsServices.insert(name);
  return res.status(mapStatusHTTP(status)).json(data);
};

const update = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  const { data, status } = await productsServices.update(name, id);
  return res.status(mapStatusHTTP(status)).json(data);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await productsServices.deleteById(id);
  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  getAll,
  getById,
  insert,
  update,
  deleteById,
};