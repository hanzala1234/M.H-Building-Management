exports = module.exports = function (app, mongoose) {

    var schema = mongoose.Schema;
    var message = new schema({
        
        announcement:{
            type: String,
            required: true
        },
        createAt:{
            type: Date,
            default: Date.now()
        },
        to:{
            type: String,
             required: true
        }
        

        }
    );
    app.db.model("announcements", message);
}
