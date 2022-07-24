const mongoose = require('mongoose');
const { Schema } = mongoose;

const clientproductSchema = new Schema({
    client: {
        type: String,
        ref: 'Client',
        index: 'true'
    },
    product: {
        type: String,
        ref: 'Product',
        index: 'true'
    },
    quantity: Number,
    price: Number,
    iva: Number
}, {
    timestamps: true
});

module.exports = mongoose.model("ClientProduct", clientproductSchema);