
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
            if (err) res.send(err);
            else {

                res.send(data);
            }

        });



    });
    router.get('/spent', (req, res) => {
        var budget = app.db.model('budget');

        budget.find({ transaction: 'expense' }, function (err, data) {
            if (err) return res.send({ error: err });
            data.reverse();
            res.send({ data: data });
        });
    });

    app.use('/budget', router);
}