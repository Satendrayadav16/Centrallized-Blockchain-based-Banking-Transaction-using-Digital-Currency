const mongoose = require("mongoose");

const User = mongoose.model(
    "User",
    new mongoose.Schema({
        username: String,
        email: String,
        publicKey: String,
        createdTime: Number,
        updatedTime: Number,
        isActive: Boolean,
    })
);

module.exports = User;
