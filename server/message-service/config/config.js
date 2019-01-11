exports=module.exports=function(app){
app.set('mongodb-url','mongodb://localhost:27017/Building-Management-Messages');
app.set('app-port','8020');
app.set('members-name-url','http://localhost:8080/member/getMultiple');

}