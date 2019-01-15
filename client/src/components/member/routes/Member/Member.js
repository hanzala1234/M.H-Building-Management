import React from 'react'
import '../Member/member.css'
let num=[
    {name:'M.Hanzala',flatNo:"S-2",balancedPayment:"1000"},
    {name:"Muzammil Sikander",flatNo:"F-1",balancedPayment:"200"},{
     name: "Yasir Gulfam", flatNo:"T-1",balancedPayment:"0"
    }];
class Members extends React.Component{
    constructor(){
        super();
        this.state={
            num:[
                {name:'M.Hanzala',flatNo:"S-2",balancedPayment:"1000"},
                {name:"Muzammil Sikander",flatNo:"F-1",balancedPayment:"200"},{
                 name: "Yasir Gulfam", flatNo:"T-1",balancedPayment:"0"
                }]
        };
    }
    render(){
        return(<div className="member-class">
        <div className="main-member-class">
            <center><h1>MEMBERS</h1></center>
            {  this.state.num.map((data)=>{
                return(
            <div className="member">
            <div className='key-value'>
               <h3>Name</h3>
               <h7>{data.name}</h7>
             </div>
             <div className='key-value'>
               <h3>Flat</h3>
               <h7>{data.flatNo}</h7>
             </div>
             <div className='key-value'>
               <h3>payment balanced</h3>
               <h7>{data.balancedPayment}</h7>
             </div>
             <img src="./images/pic1.jpg"/>
            </div>)})}
            </div>
        </div>);
    }
}
export default Members;