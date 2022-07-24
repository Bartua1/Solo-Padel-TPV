const mongoose = require('mongoose');
const { Schema } = mongoose;
const ClientProduct = require("./clientproduct");

const ticketSchema = new Schema({
    client: String,
    date: Date,
    clientproducts: [],
    total: Number
}, {
    timestamps: true
});

module.exports = mongoose.model("Ticket", ticketSchema);