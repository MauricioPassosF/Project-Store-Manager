const { salesServices } = require('../services');
const { mapStatusHTTP } = require('../utils/statusByHTTP');

const getAll = async (_req, res) => {
  const { data, status } = await salesServices.getAll();
  return res.status(mapStatusHTTP(status)).json(data);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { data, status } = await salesServices.getById(id);
  return res.status(mapStatusHTTP(status)).json(data);
};

const insert = async (req, res) => {
  const { data, status } = await salesServices.insert(req.body);
  return res.status(mapStatusHTTP(status)).json(data);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await salesServices.deleteById(id);
  return res.status(mapStatusHTTP(status)).json(data);
};

const updateQuantity = async ({ params, body }, res) => {
  const { status, data } = await salesServices
  .updateQuantity({ ...params, ...body });
  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  getAll,
  getById,
  insert,
  deleteById,
  updateQuantity,
};