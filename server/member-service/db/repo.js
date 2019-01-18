exports=module.exports=function(app,mongoose){
    
    app.db=mongoose.createConnection(app.get('mongodb-url'));
    
    app.db.on('error',function(){console.log("error");});
    app.db.once('open',function(){console.log("Mongoose is open for buisness");});
}