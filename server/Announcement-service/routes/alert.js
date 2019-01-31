exports = module.exports = function (app, mongoose) {
    var express = require('express');
    var router = express.Router();
    router.post('/alert', function (req, res, next) {




        var announcements = app.db.model("announcements");
        var memberId=req.body.memberId;
        req.body.to=memberId;
        

        const newAnnouncement = new announcements(req.body);
        newAnnouncement.save(function (err, data) {
            if (!err)
                res.send({ "success": true, message: "Message has been successfully added" });
            else
                res.send({ "success": false, message: "data could not be added" });
        });
  
});
router.get('/:id',function(req,res){
    var announcements = app.db.model("announcements");

var receiver=['all',req.params.id]
    announcements.find({to:{$in:receiver}}, (err, data) => {
        if(data) {
            data.reverse();
            res.send({success: true,data: data});}
         else res.send({success:false,message: "No data found"});
    });

});
app.use('/announcement', router);
app.use('/',function(req,res){
    return res.status(200).send({success:true});
});
}