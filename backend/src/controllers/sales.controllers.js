const { salesServices } = require('../services');
const { mapStatusHTTP } = require('../utils/statusByHTTP');

const getAll = async (_req, res) => {
  const { data, status } = await salesServices.getAll();
  return res.status(mapStatusHTTP(status)).json(data);
};

const getbyId = async (req, res) => {
  const { id } = req.params;
  const { data, status, message } = await salesServices.getbyId(id);
  return res.status(mapStatusHTTP(status)).json(data || message);
};

module.exports = {
  getAll,
  getbyId,
};