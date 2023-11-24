const mongoose = require('mongoose');

const ingredientsPizzaSchema = new mongoose.Schema({
    base: String,
    sauce: String,
    cheese: String,
    Veggies: String,
});

module.exports = mongoose.model("ingredients-custom-pizzas", ingredientsPizzaSchema)