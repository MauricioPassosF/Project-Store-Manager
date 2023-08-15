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

module.exports = {
  getAll,
  getById,
};