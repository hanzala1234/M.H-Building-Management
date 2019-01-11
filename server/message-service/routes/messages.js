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
                res.send({ "success": false, message: "data could not be added" });
        });

    });
    router.get('/message/:id',(req,res)=>{
        
        var id=req.params.id;
        var members = app.db.model("messages");
        members.find({memberId:id}, (err, memberData) => {
            if(err) return res.send({err:err});
            res.send({data:memberData});
           
        });
    });
    
    router.get('/all', function (req, res) {
        
        
        var members = app.db.model("messages");


        members.find({}, (err, memberData) => {
          
            let data = JSON.parse(JSON.stringify(memberData))
            

            if (err) return res.send({ error: err });
           
            if (data.length!=0) {

                var ids = data.map((message) => { return message.memberId; });
                var message = { ids: ids }
                
                var clientServerOptions = {

                    uri: app.get('members-name-url'),
                    body: JSON.stringify(message),
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }

                request.post(clientServerOptions, function (err, res1) {

                  
                    if (res1.length!=0) {
                        var response = JSON.parse(res1.body).result;
                        
                        for (i = 0; i < response.length; i++) {
                            data[i].name = response[i];
                        
                            
                        }
                        
                    }
                    
                    res.send({ data: data });
                   
                }
                );



            }
        });
    });

    app.use('/messages', router);
}