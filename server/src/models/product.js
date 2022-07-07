const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    price: Number,
    type: String,
    url: String,
    iva: Number
}, {
    timestamps: true
});

module.exports = mongoose.model("Product", productSchema);