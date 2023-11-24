const mongoose = require('mongoose');

const PayMorePizzaSchema = new mongoose.Schema({
    total: Number,
    pizzaItems: Array,
    userId: String,
    time: { type: Date, default: Date.now }

});

module.exports = mongoose.model("pay-many-pizzas", PayMorePizzaSchema)