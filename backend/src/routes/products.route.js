const route = require('express').Router();
const { productsModel } = require('../models');

route.get('/', async (_req, res) => {
  productsModel.findAll();
  res.status(200).json({ message: 'test' });
});

module.exports = route;