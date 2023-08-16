const { salesModel, 
  // productsModel 
} = require('../models');

const getAll = async () => {
  const data = await salesModel.getAll();
  return { status: 'SUCCESSFULL', data }; 
};

const getById = async (reqId) => {
  const data = await salesModel.getById(reqId);
  if (data.length === 0) return { status: 'NOT_FOUND', data: { message: 'Sale not found' } }; 

  return { status: 'SUCCESSFULL', data }; 
};

const insert = async (salesInfo) => {
  if (salesInfo.some(({ quantity }) => quantity <= 0)) {
    return {
      status: 'UNPROCESSABLE',
      data: { message: '"quantity" must be greater than or equal to 1' },
    };
  }
  // const productsIds = await Promise.all(salesInfo
  //   .map(({ productId }) => productsModel.getById(productId)));
  // if (productsIds.some((productId) => !productId)) {
  //   return {
  //     status: 'NOT_FOUND',
  //     data: { message: '"quantity" must be greater than or equal to 1' },
  //   };
  // }
  // console.log(productsIds);  
  const id = await salesModel.insertSales();
  await Promise.all(salesInfo
    .map((productSale) => salesModel.insertProductSale(productSale, id))); 
  const data = { id, itemsSold: salesInfo };
  return { status: 'CREATED', data };
};

module.exports = {
  getAll,
  getById,
  insert,
};