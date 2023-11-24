const Pizza = require("../models/Pizza/Pizza");


module.exports.addPizza = async (req, res) => {
    {
        try {
            let pizza = new Pizza(req.body);
            let result = await pizza.save();
            res.send(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });
        }
    }
}

module.exports.allPizza = async (req, res) => {
    {
        let pizza = await Pizza.find();
        if (pizza.length > 0) {
            res.send(pizza);
        } else {
            res.send({result:"No Pizza Found"});
        }

    }
}


module.exports.deletePizzaId = async (req, res) => {
    {
        const result = await Pizza.deleteOne({ _id: req.params.id })
        res.send(result);
    }
}

module.exports.updatePizzaId = async (req, res) => {
    {
        let result = await Pizza.updateOne({ _id: req.params.id }, { $set: req.body });
        res.send(result);

    }
}


module.exports.getSinglePizzaId = async (req, res) => {
    {
        const result = await Pizza.findOne({ _id: req.params.id });
        if (result) {
            res.send(result);

        } else {
            res.send({ result: "No Pizza Found" });
        }
    }
}

module.exports.searchKey = async (req, res) => {
    {
        let result = await Pizza.find({
            "$or": [
                { name: { $regex: req.params.key } },
                { category: { $regex: req.params.key } }
            ]
        });
        res.send(result);
    }
}