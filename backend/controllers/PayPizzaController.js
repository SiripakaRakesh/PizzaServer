const PayPizza = require('../models/PizzaPayment/PayPizza');

module.exports.addPayPizza = async (req, res) => {
    {
        try {
            let result = new PayPizza(req.body);
            result = await result.save();
            res.send(result);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'An Error Occurred' });
        }
    }
}

module.exports.deletePayPizzaTotal = async (req, res) => {
    {
        try {
            const { total } = req.params;
            let result = await PayPizza.deleteOne({ price: total });
            res.send(result);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'An Error Occurred' });
        }
    }
}

module.exports.getAllPayPizza = async (req, res) => {
    {
        let payPizza = await PayPizza.find();
        if (payPizza) {
            res.send(payPizza);
        } else {
            res.send({ result: "No Ingredients  Pizza Found" });
        }

    }
}

module.exports.getPayPizzaId = async (req, res) => {
    {
        const userId = req.params.id;
        try {
            const payPizza = await PayPizza.find({ userId });
            if (payPizza.length > 0) {
                res.send(payPizza);
            } else {
                res.send({ result: "No Pizza Found" });
            }
        } catch (error) {
            console.error("Error:", error);
            res.status(500).send({ error: "Internal Server Error" });
        }
    }
}

module.exports.deletePayPizzaOrderId = async (req, res) => {
    {
        try {
            let result = await PayPizza.deleteOne({ _id: req.params.id });
            res.send(result);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'An Error Occurred' });
        }

    }
}