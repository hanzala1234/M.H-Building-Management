
exports=module.exports=function(app){

if(process.env.phase=='production')
app.set('mongodb-url','mongodb://announcement-database:27017/Building-Management-Announcements');

else
app.set('mongodb-url','mongodb://localhost:27017/Building-Management-Announcements');

app.set('app-port','8030');

}
