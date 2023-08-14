const { productsModel } = require('../models');

const getAll = async () => {
  const data = await productsModel.getAll();
  // console.log(data);
  return { status: 'SUCCESSFULL', data }; 
};

module.exports = {
  getAll,
};