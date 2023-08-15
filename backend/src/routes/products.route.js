const route = require('express').Router();
const { productsControllers } = require('../controllers');
const { productsValidations } = require('../middlewares');

route.get('/:id', productsControllers.getById);
route.get('/', productsControllers.getAll);
route.post(
'/',
 productsValidations.validateNameFromBody,
 productsControllers.insert,
 );

module.exports = route;
