var http=require('http');
var express =require('express');
var cookieParser = require('cookie-parser');
var mongoose=require('mongoose');

var app=express();

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(function(req,res,next){
    console.log(req.url);
    next();
});

 
require('./config/config')(app);
require('./db/repo')(app,mongoose);
require('./models/message')(app,mongoose);
require('./routes/messages')(app,mongoose);

http.createServer(app).listen(app.get('app-port'));
