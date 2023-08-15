const route = require('express').Router();
const { salesControllers } = require('../controllers');

route.get('/:id', salesControllers.getById);
route.get('/', salesControllers.getAll);

module.exports = route;