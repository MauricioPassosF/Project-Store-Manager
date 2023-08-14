const { productsModel } = require('../models');

const getAll = async () => {
  const data = await productsModel.getAll();
  return { status: 'SUCCESSFULL', data }; 
};

module.exports = {
  getAll,
};