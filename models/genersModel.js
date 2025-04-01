const mongoose = require("mongoose");

const genersSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        index: true
    },
    created: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model("Genre", genersSchema);