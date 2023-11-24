const mongoose=require('mongoose');

const pizzaOrderStatusSchema=new mongoose.Schema({
    
         orderAccepted:Boolean,
         userId:String,
         orderId:String
          
});

module.exports=mongoose.model("pizzas-order-status",pizzaOrderStatusSchema)