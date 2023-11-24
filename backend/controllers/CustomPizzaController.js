const CustomPizza = require("../Models/PizzaPayment/CustomPizza");


module.exports.addCustomPizza=async(req,res)=>{
    {
        try {
          let customPizza = new CustomPizza(req.body);
          let result = await customPizza.save();
          res.send(result);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Server error' });
        }
      }
}

module.exports.getCustomPizza=async(req,res)=>{
    {
        let allCustomPizza=await CustomPizza.find();
        if(allCustomPizza.length>0){
            res.send(allCustomPizza);
        }else{
            res.send({result:"No Pizza Found"});
        }
        
    }

}

module.exports.getCustomPizzaId=async(req,res)=>{
    {
        const userId = req.params.id;
      
        try {
          const customPizzas = await CustomPizza.find({ userId }); 
          if (customPizzas.length > 0) {
            res.send(customPizzas);
          } else {
            res.send({ result: "No Pizza Found" });
          }
        } catch (error) {
          console.error("Error:", error);
          res.status(500).send({ error: "Internal Server Error" });
        }
      }
}

module.exports.deleteCustomPizzaId=async(req,res)=>{
    {
        const result=await CustomPizza.deleteOne({_id:req.params.id})
        res.send(result);
    }
}

module.exports.deleteCustomPizzaPricePrice=async(req,res)=>{
    {
        try {
          const { price } = req.params;
          console.log(price);
          const result = await CustomPizza.deleteOne({ price: price });
          res.send(result);
        } catch (error) {
          console.log(error);
          res.status(500).json({ error: 'An Error Occurred' });
        }
      }
}