const Product = require("../models/product");

const productCtrl = {};

productCtrl.getProducts = async (req, res, next) => {
  const products = await Product.find();
  res.json(products);
};

productCtrl.createProduct = async (req, res, next) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    type: req.body.type,
    url: req.body.url,
    iva: req.body.iva
  });
  await product.save();
  res.json({ status: "Product created" });
};

productCtrl.getProduct = async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.json(product);
};

productCtrl.editProduct = async (req, res, next) => {
  const { id } = req.params;
  await Product.findByIdAndUpdate(id, {$set: req.body}, {new: true});
  res.json({ status: "Product Updated" });
};

productCtrl.deleteProduct = async (req, res, next) => {
  await Product.findByIdAndRemove(req.params.id);
  res.json({ status: "Product Deleted" });
};

module.exports = productCtrl;