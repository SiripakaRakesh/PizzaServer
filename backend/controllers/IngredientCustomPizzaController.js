const IngredientsCustomPizza = require('../models/Pizza/Ingredients');
module.exports.addIngredientsCustomPizza = async (req, res) => {
    {
        try {
            let ingredientsCustomPizza = new IngredientsCustomPizza(req.body);
            let result = await ingredientsCustomPizza.save();
            res.send(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });
        }
    }
}

module.exports.deleteIngredientsCustomPizzaId = async (req, res) => {
    {
        const result = await IngredientsCustomPizza.deleteOne({ _id: req.params.id })
        res.send(result);
    }
}

module.exports.updateIngredientsCustomPizzaId = async (req, res) => {
    {
        let result = await IngredientsCustomPizza.updateOne({ _id: req.params.id }, { $set: req.body });
        res.send(result);

    }
}

module.exports.getIngredientsCustomPizzaId = async (req, res) => {
    {
        const result = await IngredientsCustomPizza.findOne({ _id: req.params.id });
        if (result) {
            res.send(result);

        } else {
            res.send({ result: "No Data Found" });
        }
    }
}

module.exports.allPizzaIngredients = async (req, res) => {
    {
        let pizza = await IngredientsCustomPizza.find();
        if (pizza) {
            res.send(pizza);
        } else {
            res.send({ result: "No Ingredients  Pizza Found" });
        }

    }
}