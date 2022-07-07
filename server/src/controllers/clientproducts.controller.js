const ClientProduct = require("../models/clientproduct");

const clientproductCtrl = {};

clientproductCtrl.getClientsProducts = async (req, res, next) => {
  const clientproduct = await ClientProduct.find();
  res.json(clientproduct);
};

clientproductCtrl.createClientProducts = async (req, res, next) => {
  const clientproduct = new ClientProduct({
    client: req.body.client,
    product: req.body.product,
    quantity: req.body.quantity,
    price: req.body.price,
    iva: req.body.iva
  });
  await clientproduct.save();
  res.json({ status: "ClientProducts created" });
};

clientproductCtrl.getClientProducts = async (req, res, next) => {
  const { client } = req.params;
  const clientproduct = await ClientProduct.find({}).where('client').equals(client);
  res.json(clientproduct);
};

clientproductCtrl.getClientProductsByProduct = async (req, res, next) => {
  const { client } = req.params.client;
  const { product } = req.params.product;
  const clientproduct = await ClientProduct.find({}).where('name').equals(client).where('product').equals(product);
  res.json(clientproduct);
};

clientproductCtrl.editClientProducts = async (req, res, next) => {
  const { id } = req.params;
  await ClientProduct.findByIdAndUpdate(id, {$set: req.body}, {new: true});
  res.json({ status: "ClientProducts Updated" });
};

clientproductCtrl.deleteClientProducts = async (req, res, next) => {
  await ClientProduct.findByIdAndRemove(req.params.id);
  res.json({ status: "ClientProducts Deleted" });
};

//const clientproduct = await ClientProduct.findById(id);

module.exports = clientproductCtrl;