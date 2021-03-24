'use strict';

const Product = require('../models/product');

function getProducts(req, res) {
  Product.find({}, (err, products) => {
    if (products.length == 0)
      return res.status(404).send({ message: 'No existen productos creados' });
    if (err) return res.status(500).send({ message: `Error al realizar la petición GET ${err}` });
    res.status(200).send({ products });
  });
}

function getProduct(req, res) {
  let productId = req.params.productId;
  Product.findById(productId, (err, product) => {
    if (!product) return res.status(404).send({ message: 'El producto no existe' });
    if (err) return res.status(500).send({ message: `Error al realizar la petición GET ${err}` });

    res.status(200).send({ product });
  });
}

function saveProduct(req, res) {
  let product = new Product();
  product.name = req.body.name;
  product.photo = req.body.photo;
  product.price = req.body.price;
  product.category = req.body.category;
  product.description = req.body.description;
  product.save((err, productStored) => {
    if (err) res.status(500).send({ message: `Error al guardar en la base de datos ${err}` });
    res.status(200).send({ product: productStored });
  });
}

function updateProduct(req, res) {
  let productId = req.params.productId;
  let update = req.body;
  Product.findByIdAndUpdate(productId, update, (err, productUpdated) => {
    if (err) res.status(500).send({ message: `Error al actualizar el producto ${err}` });
    res.status(200).send({ product: productUpdated });
  });
}

function deleteProduct(req, res) {
  let productId = req.params.productId;
  Product.findById(productId, (err, product) => {
    if (err) res.status(500).send({ message: `Error al borrar el registro ${err}` });
    product.remove((err) => {
      if (err) res.status(500).send({ message: `Error al borrar el producto ${err}` });
      res.status(200).send({ message: `El producto ha sido eliminado` });
    });
  });
}

module.exports = {
  getProduct,
  getProducts,
  saveProduct,
  updateProduct,
  deleteProduct,
};
