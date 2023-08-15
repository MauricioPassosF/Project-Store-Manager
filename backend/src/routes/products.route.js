const route = require('express').Router();
const { productsControllers } = require('../controllers');

route.get('/:id', productsControllers.getbyId);
route.get('/', productsControllers.getAll);
route.post('/', productsControllers.insert);

module.exports = route;