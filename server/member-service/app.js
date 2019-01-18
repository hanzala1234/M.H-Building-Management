var http=require('http');
var express =require('express');
var cookieParser = require('cookie-parser');
var mongoose=require('mongoose');

var app=express();

app.use(express.json());

// app.use(express.urlencoded({ extended: false}));
// app.use(express.json({limit: '50mb'}));
// app.use(express.urlencoded({limit: '50mb'}));

app.use(cookieParser());

app.use(function(req,res,next){
    console.log(req.url);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    next();
});


require('./config/config')(app);
require('./db/repo')(app,mongoose);
require('./routes/member')(app,mongoose);
require('./models/members')(app,mongoose);

http.createServer(app).listen(app.get('app-port'));
