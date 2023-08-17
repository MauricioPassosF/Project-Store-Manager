const { salesModel, productsModel } = require('../models');

const validateQuantity = (quantity) => (quantity <= 0 ? {
    status: 'UNPROCESSABLE',
    data: { message: '"quantity" must be greater than or equal to 1' },
  } : false);

// const validateProduct = (productId,saleId) => (productsModel.getById(productId) ? {
//   status: 'NOT_FOUND',
//   data: { message: 'Product not found in sale' },
// } : false);  

const validations = async (salesInfo) => {
  const quantityError = salesInfo
  .map(({ quantity }) => validateQuantity(quantity))
  .find((error) => error);
  if (quantityError) { return quantityError; }
  const productsIds = await Promise.all(salesInfo
    .map(async ({ productId }) => productsModel.getById(productId)));
  if (productsIds.includes(undefined)) {
    return {
      status: 'NOT_FOUND',
      data: { message: 'Product not found' },
    };
  }
};

const getAll = async () => {
  const data = await salesModel.getAll();
  return { status: 'SUCCESSFULL', data }; 
};

const getById = async (reqId) => {
  const data = await salesModel.getById(reqId);
  if (data.length === 0) return { status: 'NOT_FOUND', data: { message: 'Sale not found' } }; 

  return { status: 'SUCCESSFULL', data }; 
};

const validateId = async (id) => {
  const rows = await salesModel.getById(id);
  if (rows.length === 0) {
    return {
      status: 'NOT_FOUND',
      data: { message: 'Sale not found' },
    };
  }
};

const insert = async (salesInfo) => {
  const valid = await validations(salesInfo);
  if (valid) return valid; 

  const id = await salesModel.insertSales();
  await Promise.all(salesInfo
    .map((productSale) => salesModel.insertProductSale(productSale, id))); 
  const data = { id, itemsSold: salesInfo };
  return { status: 'CREATED', data };
};

const deleteById = async (id) => {
  const idError = await validateId(id);
  if (idError) return idError;
  await salesModel.deleteById(Number(id));
  return { status: 'NO_CONTENT', data: undefined };
};

const updateQuantity = async (infos) => {
  const { saleId, quantity, productId } = infos;
  const quantityError = validateQuantity(quantity);
  if (quantityError) { return quantityError; }
  const idError = await validateId(saleId);
  if (idError) return idError;
  const modelResponse = await salesModel.updateQuantity(infos);
  if (modelResponse === 0) {
    return { 
      status: 'NOT_FOUND',
      data: { message: 'Product not found in sale' } }; 
  } 
  const date = await salesModel.getSaleDate(saleId);
  return { status: 'SUCCESSFULL',
data: { 
    quantity, saleId: Number(saleId), productId: Number(productId), date } };
};

module.exports = {
  getAll,
  getById,
  insert,
  deleteById,
  updateQuantity,
};