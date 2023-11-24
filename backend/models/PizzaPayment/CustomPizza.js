const mongoose=require('mongoose');

const customPizzaSchema=new mongoose.Schema({
    base:String,
    sauce:String,
    cheese:String,
    Veggies:String,
    price:Number,
    userId:String,
    time: { type: Date, default: Date.now } 
    
});

module.exports=mongoose.model("custom-pizzas",customPizzaSchema)