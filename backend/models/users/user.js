const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    mobile: String,
    is_verified: Number,
    is_admin: Number

});

module.exports = mongoose.model("users", userSchema);