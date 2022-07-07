const mongoose = require('mongoose');
const { Schema } = mongoose;

const clientSchema = new Schema({
    name: {
        type: String,
        unique: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Client", clientSchema);