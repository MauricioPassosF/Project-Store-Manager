const route = require('express').Router();
const { productsControllers } = require('../controllers');
const { productsValidations } = require('../middlewares');

route.get('/search', productsControllers.getByName);
route.get('/:id', productsControllers.getById);
route.get('/', productsControllers.getAll);
route.post('/', productsValidations.validateNameFromBody, productsControllers.insert);
route.put('/:id', productsValidations.validateNameFromBody, productsControllers.update);
route.delete('/:id', productsControllers.deleteById);

module.exports = route;
