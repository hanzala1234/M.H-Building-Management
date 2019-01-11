exports = module.exports = function (app, mongoose) {

    var schema = mongoose.Schema;
    var budget = new schema({
        amount: {
            type: Number,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        Date: {
            type: Date,
            required: true
        },
        publishedAt: {
            type: Date,
            default: Date.now()
        },
        transaction: {
            type: String,
            required: true
        }



    }
    );
    app.db.model("budget", budget);
}
