const express = require('express');
const { products } = require('../database/queries');

const routerProducts = express.Router();

routerProducts.route('/')
  .get(products.getProducts);

routerProducts.route('/:product_id')
  .get(products.getProductById);

routerProducts.route('/:product_id/styles')
  .get(products.getStyles);

routerProducts.route('/:product_id/related')
  .get(products.getRelated);

module.exports = routerProducts;
