exports = module.exports = function (app, mongoose) {
    var express = require('express');
    
    var router = express.Router();
    
    router.post('/login', function (req, res) {
        var members = app.db.model("members");
        var email = req.body.email;
        var password = req.body.password;
        var role = req.body.role;
       
       
        members.findOne({ email: email, password: password,status:"accepted",role:role }, (err, data) => {
            if(err) res.send({success:false,error: err});
            if (data) res.send({success:true,result:data});
            else res.send({success:false,message:"Invalid Email or Password"});
        });
    });
    app.use('/member', router);
}