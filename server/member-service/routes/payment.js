exports = module.exports = function (app, mongoose) {
    var express = require('express');
    var router = express.Router();

    router.post('/payment/add', (req, res) => {
       
        var amount = req.body.amount;
        var members = app.db.model('members');
        // if(!id || ! amount || isNaN(amount)) return res.send({success: false,message:"fill required field"});


        members.updateMany({role:"member"},

            {
                $inc:{
                    paymentBalance:amount
                }
            }).then((data) => {
         if(data) res.send({success:true,data:data});
        else res.send({sucess: false,data:data});  
        }).catch((err)=>{
         res.send({success:false,error:err});
        });
        
    });
    router.post('/payment/pay', (req, res) => {
        var id = req.body.id;
        var amount = -req.body.amount;

        var members = app.db.model('members');
        if (!id || !amount || isNaN(amount)) return res.send({ success: false, message: "fill required field" });


        members.findOneAndUpdate(
            { _id: id }, {
                $inc: {
                    paymentBalance: amount
                }
            }).then((data) => {
                if (data) res.send({success:true});
                else res.send({ success: false, message: "Unable to pay,no record found" });
            }).catch((err) => {
                res.send({ success: false, error: err });
            });

    });
    app.use('/member', router);
    //entry point for LoadBalancer health check
    app.use('/',(req,res)=>res.send({success:true}));
}