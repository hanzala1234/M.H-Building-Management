exports = module.exports = function (app, mongoose) {

    var schema = mongoose.Schema;
    var member = new schema({
        name: {
            type: String,
            required: true,
        },
        password:{
            type: String,
            required: true
        },
        paymentBalance: {
            type: Number,
            required: true,
            default: 1000
        },
        email: {
            type: String,
            required: true,
            
        },
        contact: {
            type: String,
            required: true
        },
        flatNo: {
            type: String,
            required: true
        },
        status: {
            type: String,
            default: "pending"
        },
        image:{
            type: String,
            required: true
        }
    });
    app.db.model("members", member);
}
