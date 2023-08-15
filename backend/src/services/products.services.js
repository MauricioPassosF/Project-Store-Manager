const { productsModel } = require('../models');

const getAll = async () => {
  const data = await productsModel.getAll();
  return { status: 'SUCCESSFULL', data };
};

const getById = async (reqId) => {
  const data = await productsModel.getById(reqId);

  if (data.length === 0) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };

  return { status: 'SUCCESSFULL', data };
};

const insert = async (reqName) => {
  if (reqName.length < 5) {
    return {
      status: 'UNPROCESSABLE',
      data: { message: '"name" length must be at least 5 characters long' },
    };
  }
  const data = await productsModel.insert(reqName);
  // console.log(`Log Service: ${data}`);
  return { status: 'CREATED', data };
};

module.exports = {
  getAll,
  getById,
  insert,
};
