exports = module.exports = function (app, mongoose) {
    var express = require('express');

    var router = express.Router();
    router.get("/:id/profile", (req, res) => {
        var id = req.params.id;
        var members = app.db.model('members');

        members.findOne({ _id: id }).then((data) => {
         if(data) res.send({success:true,data:data});
        else res.send({success:false,message:"No data found against this id"});
        }).catch((err)=>{
         res.send({success:false,error:err});
        });


    });
    router.get("/all", (req, res) => {
        
        var members = app.db.model('members');

        members.find({ status:"accepted" }).then((data) => {
            
         if(data) res.send({success:true,data:data});
        else res.send({success:false,message:"No data found "});
        }).catch((err)=>{
         res.send({success:false,error:err});
        });


    });
    router.get("/pending", (req, res) => {
        
        var members = app.db.model('members');
        
        members.find({status:"pending"}).then((data) => {
         if(data.length!=0) res.send({data:data});
        else res.send({data:data});
        }).catch((err)=>{
         res.send({error:err});
        });


    });
    router.post('/pending/accept',(req,res)=>{
        var members = app.db.model('members');
        var id=req.body.id;
        members.findOneAndUpdate(
            {_id:id},{
                $set:{
                    status:"accepted"
                }
            }).then((data) => {
         if(data) res.send({success:true,data:data});
        else res.send({sucess: false,data:data});
        }).catch((err)=>{
         res.send({success:false,error:err});
        });


    }
    );
    router.post('/pending/delete',(req,res)=>{
        var members = app.db.model('members');
        var id=req.body.id;
        members.findOneAndDelete(
            {_id:id}).then((data) => {
         if(data) res.send({success:true,data:data});
        else res.send({sucess: false,data:"No data found against this id"});
        }).catch((err)=>{
         res.send({success:false,error:err});
        });


    }
    );
    app.use("/member", router);
    
}