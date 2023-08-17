const validateProductId = (productId) => { 
  if (!productId) { 
    return '"productId" is required';
  } 
};

const validateQuantity = (quantity) => { 
  if (!quantity && quantity !== 0) { 
    return '"quantity" is required';
  } 
};

const validateFields = (salesInfo) => {
  const errors = salesInfo.map(({ productId, quantity }) => {
    if (validateProductId(productId)) return validateProductId(productId);
    if (validateQuantity(quantity)) return validateQuantity(quantity);
    return false;
  });
  return errors.find((error) => typeof error === 'string');
};

const validateSalesFromBody = (req, res, next) => {
  const message = validateFields(req.body);
  if (message) {
 return res.status(400).json({ message });
}
  next();
};

// const validateQuantityFromBody = (req, res, next) => {
//   const message = validateQuantity(req.body);
//   if (message) {
//  return res.status(400).json({ message });
// }
//   next();
// };

module.exports = {
  validateSalesFromBody,
};