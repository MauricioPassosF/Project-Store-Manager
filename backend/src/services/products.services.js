const { productsModel } = require('../models');

const validateLength = (name, length) => {
  if (name.length < length) {
    return {
      status: 'UNPROCESSABLE',
      data: { message: '"name" length must be at least 5 characters long' },
    };
  }
};

const validateId = async (id) => {
  if (!await productsModel.getById(id)) {
    return {
      status: 'NOT_FOUND',
      data: { message: 'Product not found' },
    };
  }
};

const getAll = async () => {
  const data = await productsModel.getAll();
  return { status: 'SUCCESSFULL', data };
};

const getById = async (reqId) => {
  const data = await productsModel.getById(reqId);
  if (!data) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };

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
  return { status: 'CREATED', data };
};

const update = async (name, id) => {
  const lenghtError = validateLength(name, 5);
  if (lenghtError) return lenghtError;
  const idError = await validateId(id);
  if (idError) return idError;
  const data = await productsModel.update(name, Number(id));
  return { status: 'SUCCESSFULL', data };
};

const deleteById = async (id) => {
  const idError = await validateId(id);
  if (idError) return idError;
  await productsModel.deleteById(Number(id));
  return { status: 'NO_CONTENT', data: undefined };
};

module.exports = {
  getAll,
  getById,
  insert,
  update,
  deleteById,
};
