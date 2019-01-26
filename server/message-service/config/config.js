exports=module.exports=function(app){
	if(process.env.phase=='production')
app.set('mongodb-url','mongodb://message-database:27017/Building-Management-Messages');
	else
app.set('mongodb-url','mongodb://localhost:27017/Building-Management-Messages');
app.set('app-port','8020');
app.set('members-name-url','http://localhost:8080/member/getMultiple');

}
