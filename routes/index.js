'use strict';

const express = require('express');
const ProductCtrl = require('../controllers/product');
const UserCtrl = require('../controllers/user');
const auth = require('../middlewares/auth');
const api = express.Router();

api.post('/signup', UserCtrl.signUp);
api.post('/signin', UserCtrl.signIn);
api.get('/product', ProductCtrl.getProducts);
api.get('/product/:productId', ProductCtrl.getProduct);
api.post('/product', ProductCtrl.saveProduct);
api.put('/product/:productId', ProductCtrl.updateProduct);
api.delete('/product/:productId', ProductCtrl.deleteProduct);
api.get('/private', auth, function (req, res) {
  res.status(200).send({ message: 'Tienes acceso' });
});
module.exports = api;
