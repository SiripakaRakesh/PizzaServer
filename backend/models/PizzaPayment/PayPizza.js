const mongoose = require('mongoose');

const PayPizzaSchema = new mongoose.Schema({
    name: String,
    price: Number,
    category: String,
    ingredients: String,
    userId: String,
    pizzaImage: String,
    orderId: String,
    time: { type: Date, default: Date.now }

});

module.exports = mongoose.model("pay-pizzas", PayPizzaSchema)