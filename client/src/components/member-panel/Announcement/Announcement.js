import React from 'react'
import './Announcement.css'
import NavBar from '../navBar/navBar'
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
                <NavBar />
            
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
        fetch('http://localhost:8030/Announcement/'+sessionStorage.getItem("user_id")).then(
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
            <div className="announcement">
            {console.log(announcement)}
            <span id="date">{announcement.createAt}</span>
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