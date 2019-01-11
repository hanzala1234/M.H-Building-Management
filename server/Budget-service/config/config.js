exports=module.exports=function(app){
app.set('mongodb-url','mongodb://localhost:27017/Building-Management-Budget');
app.set('app-port','8050');
app.set('member-payment-route',"http://localhost:8080/member/payment/pay");

}