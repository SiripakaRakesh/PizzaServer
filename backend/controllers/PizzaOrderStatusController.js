const PizzaOrderStatus = require("../models/PizzaOrderStatus/PizzaOrderStatus");

module.exports.acceptedPizza = async (req, res) => {
    {
        let result = new PizzaStatus(req.body);
        result = await result.save();
        res.send(result);

    }
}