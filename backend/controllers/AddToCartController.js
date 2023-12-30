const AddToCart = require("../models/Pizza/AddToCart");

module.exports.addToCart = async (req, res) => {
  {
    try {
      let result = new AddToCart(req.body);
      result = await result.save();
      res.send(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'An Error Occurred' });
    }
  }
}

module.exports.getCartPizzaId = async (req, res) => {
  {
    const userId = req.params.id;

    try {
      const AddToCartPizzas = await AddToCart.find({ userId });
      if (AddToCartPizzas.length > 0) {
        res.send(AddToCartPizzas);
      } else {
        res.send({ result: "No Pizza Found" });
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send({ error: "Internal Server Error" });
    }
  }
}

module.exports.deleteCartPizzaId = async (req, res) => {
  {
    const result = await AddToCart.deleteOne({ _id: req.params.id })
    res.send(result);
  }
}

module.exports.clearCart = async (req, res) => {
  const userId = req.params.userId; 

  try {
    const result = await AddToCart.deleteMany({ userId });
    res.send(result);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
}

