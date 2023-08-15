const route = require('express').Router();
const { salesControllers } = require('../controllers');

route.get('/:id', salesControllers.getbyId);
route.get('/', salesControllers.getAll);

module.exports = route;