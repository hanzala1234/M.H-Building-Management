exports = module.exports = function (app, mongoose) {
    var express = require('express');
    const multer = require('multer');
    var router = express.Router();
    router.post('/getMultiple', function (req, res) {
        var ids = req.body.ids;



       var members = app.db.model("members");

        members.find({ _id: { $in: ids } }, function (err, result) {
            var myresult = [];
            if (result) {

                ids.forEach(function (id) {
                    for (var i = 0; i < result.length; i++) {

                        if (result[i]._id == id) { myresult.push(result[i]); break; }
                    }

                });

                var names = myresult.map((data) => { return data.firstName+" "+data.lastName });

                res.send({ result: names });
            }
            else {
                res.send({ message: "no result find" });
            }

        });
    });

    app.use('/member', router);
}