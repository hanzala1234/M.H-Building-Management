exports=module.exports=function(app){
if(process.env.phase=='production')
app.set('mongodb-url','mongodb://member-database:27017/Building-Management');
else
app.set('mongodb-url','mongodb://localhost:27017/Building-Management');
	
//app.set('mongodb-url','mongodb://localhost:27019/Building-Management');
app.set("app-port",8080);
app.set('cloud_name','hanzala-cloud');
app.set('api_key','951633293415786');
app.set('api_secret','pdGL8LTTLsZoP8kR3dKXrggey1g');

}
