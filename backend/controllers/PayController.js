const Crypto =require('crypto');
const Razorpay = require('razorpay');
const key_id='rzp_test_wh1FtnCd5Mu5qn';
const key_secret='uI43bp3XzsBzKLteMUCp9Vx2';

module.exports.orders=(req,res)=>{
    
    let instance = new Razorpay({ key_id: key_id, key_secret: key_secret });
    var options = {
        amount: req.body.amount*100, 
        currency: "INR",
      };

    console.log(options);

      instance.orders.create(options, function(err, order) {
        if(err){
            console.log(err);
            return res.send({code:500,massage:'Server Err '});
        }
         

        console.log(order);
        return res.send({code:200,message:'order created',data:order})
        
      });
   
}

module.exports.verify=(req,res)=>{

    let body =req.body.response.razorpay_order_id + "|" +req.body.response.razorpay_payment_id;

    function hmac_sha256(data, secret) {
        const hmac = Crypto.createHmac('sha256', secret);
        hmac.update(data.toString());
        return hmac.digest('hex');
      }

    var generated_signature = hmac_sha256(body , key_secret);

    if (generated_signature ==req.body.response.razorpay_signature) {
        
        res.send({code:200,message:'Sign Valid'});
    }else{
        res.send({code:500,message:'Sign InValid'});
    }
     

}