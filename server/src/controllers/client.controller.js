const Client = require("../models/client");

const clientCtrl = {};

clientCtrl.getClients = async (req, res, next) => {
  const client = await Client.find();
  res.json(client);
};

clientCtrl.createClient = async (req, res, next) => {
  const client = new Client({
    name: req.body.name
  });
  try{
    await client.save();
    res.json({ status: "Client created" });
  }
  catch(error){
    res.json({status: "Client already exists"});
    console.log(error);
  }
};

clientCtrl.getClient = async (req, res, next) => {
  const { id } = req.params;
  const client = await Client.findById(id);
  res.json(client);
};

clientCtrl.editClient = async (req, res, next) => {
  const { id } = req.params;
  await Client.findByIdAndUpdate(id, {$set: req.body}, {new: true});
  res.json({ status: "Client Updated" });
};

clientCtrl.deleteClient = async (req, res, next) => {
  const a = await Client.find({}).where('name').equals(req.params.id);
  await Client.findByIdAndRemove(a[0]._id);
  res.json({ status: "Client Deleted" });
};

module.exports = clientCtrl;