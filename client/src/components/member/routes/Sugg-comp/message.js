import React from 'react'
import './message.css'
class Announcement extends React.Component{
    constructor(){
        super();
        this.state={
            messages:[{
                date:"3-May-2018",
                message:"There should be dark light in first floor ,kindly fix it please as soon as possible",
                type: 'suggestion',
                name: 'Ali Ahmed'
            },{
                date:"5-June-2018",
                message:"I can tolerate bheviour of managment commitee member anymore",
                type: 'complain',
                name:'Abdul Razzaq'
            },
            {
                date:"5-June-2018",
                message:"I can tolerate bheviour of managment commitee member anymore",
                type: 'complain',
                name:'Abdul Razzaq'
            }
        ]
        }
    }
    render(){
        return(
        <div className='main-div'>
        <div className='main-center-div'>
       
       <div className="message-div">
       <div className='message-header'>
       <textarea cols={70} ></textarea>
      <ul>
      <li>
       <select>
           
           <option>Complain</option>
           <option>Suggestion</option>
           </select>
           
           </li>
       <li><button>Submit</button></li>
       </ul>
       </div>

       <center>   <h1>All Suggestion/Complain</h1> </center>
       {this.state.messages.map((message)=>{
           return(
            <div  className={message.type=='complain'?'complain':"suggestion"}>
            <h4>{message.name}</h4>
            <date>{message.date}</date>
            <p> {message.message}</p>
           <spam id="type"> type: {message.type}</spam>
            
            </div>
           )
       })}
      
       
       </div>
        </div>
        </div>
        );
    }
}
export default Announcement;