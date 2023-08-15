const route = require('express').Router();
const { productsControllers } = require('../controllers');

route.get('/:id', productsControllers.getbyId);
route.get('/', productsControllers.getAll);

module.exports = route;