exports = module.exports = function (app, mongoose) {
    var express = require('express');
    var router = express.Router();
    router.get('/:month/:year', (req, res) => {

        var previousDate = new Date("1" + req.params.month + req.params.year);

        var newDate = new Date("1" + req.params.month + req.params.year);
        newDate.setMonth(newDate.getMonth() + 1);


        var budget = app.db.model('budget');
        budget.aggregate(
            [
                {
                    $match: { Date: { $lt: newDate, $gte: previousDate }, transaction: {$in:["expense","receive"]} }
                }
            ]

        ).exec(function (err, data) {
            var income=0;
            if(data.length!=0){
                
              data=data.filter((field)=>{
                    if(field.transaction=='receive'){
                        income+=field.amount;
                        return false;
                    }
                    return true;
                });

            }
            budget.aggregate(
                [{
                    $match: {
                        transaction: { $in: ["expense", "receive"] },
                        Date: { $lt: previousDate }

                    }
                },
                {
                    $group: {
                        _id: "$transaction",
                        total: { $sum: "$amount" }
                    }
                }

                ]

            ).exec(function (err, result) {
                console.log(result);
                var saving = 0;
                if (result[0] && !result[1] && result[0]._id == 'expense') saving = -result[0].total;
                else if (result[0] && !result[1] && result[0]._id == 'receive') saving = result[0].total;

                else if (result[0] && result[1])
                    saving = result[0].total - result[1].total;

                return res.send({ err: err, data: data, savings: saving,income:income });
            })

            // res.send({ err: err, data: data });
        })



    });


    app.use('/budget', router);
}