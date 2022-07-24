const ClientProduct = require("../models/clientproduct");
const mongoose = require("mongoose");

const clientproductCtrl = {};

clientproductCtrl.getClientsProducts = async (req, res, next) => {
  try{
    const clientproduct = await ClientProduct.find();
    res.json(clientproduct);
  }
  catch(error){
    res.json({status: "Couldnt Retrieve ClientsProducts"});
    console.log(error);
  }
};

clientproductCtrl.createClientProducts = async (req, res, next) => {
  try{
    const clientproduct = new ClientProduct({
      client: req.body.client,
      product: req.body.product,
      quantity: req.body.quantity,
      price: req.body.price,
      iva: req.body.iva
    });
    await clientproduct.save();
    res.json({ status: "ClientProducts created" });
  }
  catch(error){
    res.json({status: "Couldnt create ClientProduct"});
    console.log(error);
  }
};

clientproductCtrl.getClientProducts = async (req, res, next) => {
  try{
    const { client } = req.params;
    const clientproduct = await ClientProduct.find({}).where('client').equals(client);
    res.json(clientproduct);
  }
  catch(error){
    res.json({status: "Couldnt Retrieve ClientProducts"});
    console.log(error);
  }
};

clientproductCtrl.getClientProductsByProduct = async (req, res, next) => {
  try{
    const { client } = req.params.client;
    const { product } = req.params.product;
    var clientproduct = await ClientProduct.find({}).where('client').equals(client).where('product').equals(product);
    res.json(clientproduct);
  }
  catch(error){
    res.json({status: "Couldnt retrieve ClientProduct by ClientProduct"});
    console.log(error);
  }
};

clientproductCtrl.editClientProducts = async (req, res, next) => {
  try{
    const { id } = req.params;
    await ClientProduct.findByIdAndUpdate(id, {$set: req.body}, {new: true});
    res.json({ status: "ClientProducts Updated" });
  }
  catch(error){
    res.json({status: "Couldnt edit ClientProduct"});
    console.log(error);
  }
};

clientproductCtrl.deleteClientProducts = async (req, res, next) => {
  try{
    await ClientProduct.findByIdAndRemove(req.params.id);
    res.json({ status: "ClientProducts Deleted" });
  }
  catch(error){
    res.json({status: "Couldnt delete ClientProduct"});
    console.log(error);
  }
};

//const clientproduct = await ClientProduct.findById(id);

module.exports = clientproductCtrl;