const mongoose = require('mongoose');

const AddToCartSchema = new mongoose.Schema({
    name: String,
    price: Number,
    category: String,
    ingredients: String,
    userId: String,
    pizzaImage: String,
    time: { type: Date, default: Date.now }

});

module.exports = mongoose.model("add-to-carts", AddToCartSchema)