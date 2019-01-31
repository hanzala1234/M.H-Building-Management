exports = module.exports = function (app, mongoose) {
    var express = require('express');
    var router = express.Router();
    

   
    router.post('/', function (req, res, next) {




        var announcements = app.db.model("announcements");

        req.body.to='all';

        const newAnnouncement = new announcements(req.body);
        newAnnouncement.save(function (err, data) {
            if (!err)
                res.send({ "success": true, message: "Message has been successfully added" });
            else
                res.send({ "success": false, message: "data could not be added" });
        });

    });
    router.get('/all', function (req, res) {

        var announcements = app.db.model("announcements");


        announcements.find({to:'all'}, (err, data) => {
            if(data) {
                data.reverse();
                res.send({success: true,data: data});
            }
             else res.send({success:false,message: "No data found"});
        });
    });
           


           

    app.use('/announcement', router);
    
    require('./alert')(app,mongoose);
}