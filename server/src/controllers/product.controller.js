const Product = require("../models/product");

const productCtrl = {};

productCtrl.getProducts = async (req, res, next) => {
  try{
    const products = await Product.find();
    res.json(products);
  }
  catch(error){
    res.json({status: "Couldnt retrieve Products"});
    console.log(error);
  }
};

productCtrl.createProduct = async (req, res, next) => {
  try{
    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      type: req.body.type,
      url: req.body.url,
      iva: req.body.iva
    });
    await product.save();
    res.json({ status: "Product created" });
  }
  catch(error){
    res.json({status: "Couldnt crete Product"});
    console.log(error);
  }
};

productCtrl.getProduct = async (req, res, next) => {
  try{
    const { id } = req.params;
    const product = await Product.findById(id);
    res.json(product);
  }
  catch(error){
    res.json({status: "Couldnt get Product"});
    console.log(error);
  }
};

productCtrl.editProduct = async (req, res, next) => {
  try{
    const { id } = req.params;
    await Product.findByIdAndUpdate(id, {$set: req.body}, {new: true});
    res.json({ status: "Product Updated" });
  }
  catch(error){
    res.json({status: "Couldnt edit Product"});
    console.log(error);
  }
};

productCtrl.deleteProduct = async (req, res, next) => {
  try{
    await Product.findByIdAndRemove(req.params.id);
    res.json({ status: "Product Deleted" });
  }
  catch(error){
    res.json({status: "Couldnt delete Product"});
    console.log(error);
  }
};

module.exports = productCtrl;