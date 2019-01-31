exports = module.exports = function (app, mongoose) {
    var express = require('express');
    var router = express.Router();
    var request = require('request');

   
    router.post('/', function (req, res, next) {




        var messages = app.db.model("messages");



        const newMessage = new messages(req.body);
        newMessage.save(function (err, data) {
            if (!err)
                res.send({ "success": true, message: "Message has been successfully added" });
            else
                res.send({ "success": false, message: err });
        });

    });
    router.get('/message/:id',(req,res)=>{
        
        var id=req.params.id;
        var members = app.db.model("messages");
        members.find({memberId:id}, (err, memberData) => {
            if(err) return res.send({success:false,error:err});
            
            res.send({success:true,data:memberData});
           
        });
    });
    
    router.get('/all', function (req, res) {
        
        
        var members = app.db.model("messages");


        members.find({}, (err, memberData) => {
          
            
            

            if (err) return res.send({ success:false,error: err });
            memberData=memberData.reverse();
            res.send({success:true,data:memberData});
            
                                
               

            
            
        });
    });

    app.use('/messages', router);
    //entry point for LoadBalancer health check
    app.use('/',(req,res)=>res.send({success:true}));
}