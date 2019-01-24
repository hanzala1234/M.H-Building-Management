import React from 'react'
import './Announcement.css'
import GloabalApi from '../../../config/api'

class Announcement extends React.Component{
    componentDidMount(){
        this.fetchAnnouncement();
    }

    constructor(){
        super();
        this.state={
            announcements:[],
            err:null,
            isLoading:true
        }
    }
    

    render(){
        return(
            <div>
               
            
        <div className='main-div'>
        <div className='main-center-div'>
       <center>   <h1>Notification</h1> </center>
       <div className="announcement-div">
      
      { (!this.state.isLoading)?<DisplayAnnouncement {...this.state}/>:<p>Loading...</p>}
       
       </div>
        </div>
        </div>
        </div>
        );
    }
    fetchAnnouncement=()=>{
        const userId=sessionStorage.getItem("user_id");
        
        fetch(`${GloabalApi.announcementApi}Announcement/${userId}`).then(
                (response)=>{
                    response.json().then((data)=>{
                        if(data.success){
                            // console.log(data1);
                            this.setState({announcements:data.data,isLoading:false})
                        }
                        else{
                            
                            this.setState({isLoading:false,err:data.message})            
                        }
                    })
                    
                }
            ).catch((err)=>{
                
                this.setState({isLoading:false,err:err.message})
            }

            );

    }
}
function DisplayAnnouncement(props){
 if(!props.isLoading&& !props.err){
    return(
    <div>
    {props.announcements.map((announcement)=>{
        return(
            <div className="announcement" key={announcement._id}>
            
            <span id="date">{new Date(announcement.createAt).toDateString()}</span>
            <div className="para"><p>
            {announcement.announcement}</p>
            </div>
            </div>
        );
   }) } </div> );
}
else if(props.isLoading) return(<p>Loading.....</p>);
else if (props.err) return(<p>Error while fetching data</p>);
}
export default Announcement;