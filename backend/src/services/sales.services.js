const { salesModel } = require('../models');

const getAll = async () => {
  const data = await salesModel.getAll();
  return { status: 'SUCCESSFULL', data }; 
};

const getbyId = async (reqId) => {
  const data = await salesModel.getbyId(reqId);
  if (data.length === 0) return { status: 'NOT_FOUND', data: { message: 'Sale not found' } }; 

  return { status: 'SUCCESSFULL', data }; 
};

module.exports = {
  getAll,
  getbyId,
};