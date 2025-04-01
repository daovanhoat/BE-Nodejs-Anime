const mongoose = require("mongoose");

async function connectDB() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/animie-api");
        console.log("connect db success");
    } catch (error) {
        console.log("connect db fail: ", error.message);
    }
}

module.exports = connectDB;