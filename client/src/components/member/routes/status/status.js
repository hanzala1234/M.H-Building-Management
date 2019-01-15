import React from 'react'
import './status.css'
class Status extends React.Component{
    constructor(){
        super();
        this.state={
           name: 'Muzammil Siknader',
           flatNo: 'S-2',
           balancedPayment:"3000",
           messages:[{
            message:"There should be bright lights in first floor ,so no one have to face problem",
            date:"3-May-2018"
           },{
            message:"I am fedup with cleaniness condition of building,kindly do something to resolve it",
            date:"2-June-2018"
           }]
        }
        
    }
    render(){
        return(
        <div className='main-div'>
        <div className='main-center-div'>
       
       <div className="status-div">
       
      <center><h1> My Profile</h1></center>
      <div className='status-top'>
      <table>
            <tr><th>Name</th><th>Flat No</th></tr>
            <tr><td>{this.state.name}</td><td>{this.state.flatNo}</td></tr>
            <tr><th colSpan="2">payment Balanced</th></tr>
            <tr><td colSpan="2">{this.state.balancedPayment}</td></tr>
      </table>
      <img src='images/pic1.jpg'/>
      </div>
       <h2>My Complain/Suggestions</h2>
       <div className="message-box">
       {this.state.messages.map((message)=>{
         return(
            <div className="message">
            <span id='date'>{message.date}</span>
            <p>{message.message}</p>
            
             </div>
         );  
       })}
       
       </div>
       </div>
        </div>
        </div>
        );
    }
}
export default Status;