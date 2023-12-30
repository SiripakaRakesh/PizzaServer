const PayManyPizza = require("../models/PizzaPayment/PayMorePizza");


module.exports.addManyPayPizza=async(req,res)=>{
    {
        try {
          const payPizzaData = req.body; 
      
          const result = await PayManyPizza.insertMany(payPizzaData);
      
          res.status(200).json(result);
        } catch (error) {
          console.log(error);
          res.status(500).json({ error: 'An error occurred' });
        }
      }
}


module.exports.deleteManyPayPizzaItemTotal=async(req,res)=>{
    {
        try {
          const { total } = req.params;
          let result = await PayManyPizza.deleteMany({ total: total });
          res.send(result);
        } catch (error) {
          console.log(error);
          res.status(500).json({ error: 'An Error Occurred' });
        }
      
      }
}

module.exports.getAllManyPayPizza=async(req,res)=>{
    {
        let payPizza=await PayManyPizza.find();
        if(payPizza){
            res.send(payPizza);
        }else{
            res.send({result:"No Ingredients  Pizza Found"});
        }
        
      }
}

module.exports.getManyPayPizzaId=async(req,res)=>{
    {
        const userId = req.params.id;
        try {
          const payManyPizza = await PayManyPizza.find({ userId });
          if (payManyPizza.length > 0) {
            res.send(payManyPizza);
          } else {
            res.send({ result: "No Pizza Found" });
          }
        } catch (error) {
          console.error("Error:", error);
          res.status(500).send({ error: "Internal Server Error" });
        }
      }
}

module.exports.deleteManyPayPizzaId=async(req,res)=>{
    {
        try {
          
          let result = await PayManyPizza.deleteOne({ _id: req.params.id });
          res.send(result);
        } catch (error) {
          console.log(error);
          res.status(500).json({ error: 'An Error Occurred' });
        }
      
      }
}