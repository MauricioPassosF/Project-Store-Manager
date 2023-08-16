const route = require('express').Router();
const { salesControllers } = require('../controllers');
const { salesValidations } = require('../middlewares');

route.get('/:id', salesControllers.getById);
route.get('/', salesControllers.getAll);
route.post(
'/',
 salesValidations.validateSalesFromBody,
 salesControllers.insert,
 );

module.exports = route;