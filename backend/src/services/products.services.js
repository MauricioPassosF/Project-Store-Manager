const { productsModel } = require('../models');

const getAll = async () => {
  const data = await productsModel.getAll();
  return { status: 'SUCCESSFULL', data }; 
};

const getbyId = async (reqId) => {
  const data = await productsModel.getbyId(reqId);

  if (!data) return { status: 'NOT_FOUND', data: { message: 'Product not found' } }; 

  return { status: 'SUCCESSFULL', data }; 
};

module.exports = {
  getAll,
  getbyId,
};