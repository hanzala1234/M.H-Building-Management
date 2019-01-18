exports = module.exports = function (app, mongoose) {
    var express = require('express');
    const multer = require('multer');
    var router = express.Router();
    const cloudinary = require('cloudinary');


    cloudinary.config({
        cloud_name: app.get('cloud_name'),
        api_key: app.get('api_key'),
        api_secret: app.get('api_secret')
    });

    

    var storage = multer.diskStorage({
        
        filename: function (req, file, cb) {
        
          cb(null, file.fieldname + '-' + Date.now())
        }
      })
   
      var upload = multer({ storage: storage })


    function uploadImage(req, res) {

        cloudinary.v2.uploader.upload(req.file.path, { secure: true }, (err, imgData) => {

            if (err) res.send({ error: err });
            else{
                req.body.image=imgData.url; 
                uploadData(req, res);
            }
        });
    }
    function uploadData(req, res) {
        var members = app.db.model("members");

    
         
        const newMember = new members(req.body);

        newMember.save(function (err, data) {
            if (!err)
                res.send({ "success": true, message: "data has been successfully added" });
            else
                res.send({ "success": false, message: err });
        });

    }

    router.post('/signup', upload.single("img"), function (req, res) {
  
         console.log(req.body);

        uploadImage(req, res);

    });

    


    

    app.use('/member', router);
}