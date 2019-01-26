exports=module.exports=function(app){
	if(process.env.phase=='production')
			
app.set('mongodb-url','mongodb://budget-database:27017/Building-Management-Budget');
	else		
app.set('mongodb-url','mongodb://localhost:27017/Building-Management-Budget');

app.set('app-port','8050');
	if(process.env.phase=='production')
app.set('member-payment-route',"http://member-service:8080/member/payment/pay");
	else	
app.set('member-payment-route',"http://localhost:8080/member/payment/pay");


}
