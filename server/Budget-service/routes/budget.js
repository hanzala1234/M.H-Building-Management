exports = module.exports = function (app, mongoose) {
    require('./receive-route')(app,mongoose);
    require('./spent-route')(app,mongoose);
    require('./getBudget')(app,mongoose);
    
    //entry point for LoadBalancer health check
    app.use('/',(req,res)=>res.send({success:true}));
}