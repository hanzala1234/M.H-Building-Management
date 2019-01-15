import React from 'react'
import './Announcement.css'
class Announcement extends React.Component{
    constructor(){
        super();
        this.state={
            announcements:[{
                date:"3-May-2018",
                message:"Mr Hassan your amount of 1000 is due,kindly pay is as soon as possible"
            },{
                date:"4-June-2018",
                message:"Motor will not turn on today,kindly arrange "
            }
        ]
        }
    }
    render(){
        return(
        <div className='main-div'>
        <div className='main-center-div'>
       <center>   <h1>Notification</h1> </center>
       <div className="announcement-div">
       {this.state.announcements.map((announcement)=>{
            return(
                <div className="announcement">
                <span id="date">{announcement.date}</span>
                <div className="para"><p>
                {announcement.message}</p>
                </div>
                </div>
            );
       })}
      
       
       </div>
        </div>
        </div>
        );
    }
}
export default Announcement;