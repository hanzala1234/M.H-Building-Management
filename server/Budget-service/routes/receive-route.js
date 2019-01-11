
exports = module.exports = function (app, mongoose) {
    var express = require('express');
    var router = express.Router();
    var request = require('request');


    router.post('/receive', (req, res) => {
        var body = req.body;
        var memberId=req.body.memberId;
        var budget = app.db.model('budget');
        body.transaction = 'receive';
       
        var newitem = new budget(req.body);
        if(!memberId) return res.send({success:false,message:"kindly add member id as well"});
        newitem.save(function (err, data) {
            if (err) return res.send(err);
            if (data) {
                
                var clientServerOptions = {

                    uri: app.get('member-payment-route'),
                    body: JSON.stringify({id:memberId,amount:req.body.amount}),
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
                request.post(clientServerOptions, function (err, response) {
                  if(response){
                  return  res.send({ data: data });
                  }
                  if(err) return res.send({error:error,message:"unable to pay"});


                    

                }
                );
            }

        });



    });
    router.get('/receive', (req, res) => {
        var budget = app.db.model('budget');
        console.log("Object recieved");
        budget.find({ transaction: 'receive' }, function (err, data) {
            res.send(data);
        });
    });

    app.use('/budget', router);
}