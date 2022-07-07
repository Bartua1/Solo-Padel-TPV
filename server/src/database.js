
const mongoose = require("mongoose");

const URI = "mongodb://0.0.0.0:27017/Solopadel";

mongoose
  .connect(URI)
  .then((db) => console.log("db is connected"))
  .catch((err) => console.error(err));

module.exports = mongoose;