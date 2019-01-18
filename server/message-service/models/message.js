exports = module.exports = function (app, mongoose) {

    var schema = mongoose.Schema;
   
    var message = new schema({
        name:{
            type: String,
            required: true
        },
        memberId:{
            type: String,
            required: true
        },
        message:{
            type: String,
            required: true
        },
        createAt:{
            type: Date,
            default: Date.now()
        },
        messageType:{
            type: String,
            required: true
        }

        }
    );
    app.db.model("messages", message);
}
