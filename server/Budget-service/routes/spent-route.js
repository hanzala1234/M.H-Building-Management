
exports = module.exports = function (app, mongoose) {
    var express = require('express');
    var router = express.Router();


    router.post('/spent', (req, res) => {
        var body = req.body;
        console.log("request recived");
        var budget = app.db.model('budget');
        body.transaction = 'expense';
        var newitem = new budget(req.body);
        newitem.save(function (err, data) {
            if (err) return res.send({success:false,err:err});
            

                res.send({success:true,data:data});

        });



    });
    router.get('/spent', (req, res) => {
        var budget = app.db.model('budget');
            var date = new Date();
            var previousDate = new Date();
            previousDate.setDate(0);
            console.log(previousDate.toDateString())

           
        budget.find({ transaction: 'expense',Date:{ $lt: date, $gt: previousDate } },
         function (err, data) {
            if (err) return res.send({success:false, error: err });
            data.reverse();
            res.send({ success:true,data: data });
        });
    });

    app.use('/budget', router);
}