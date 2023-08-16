const route = require('express').Router();
const { salesControllers } = require('../controllers');

route.get('/:id', salesControllers.getById);
route.get('/', salesControllers.getAll);
route.post(
'/',
//  productsValidations.validateNameFromBody,
 salesControllers.insert,
 );

module.exports = route;