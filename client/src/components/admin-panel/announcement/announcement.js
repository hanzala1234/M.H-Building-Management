import React from 'react';
import './announcement.css'
import GloabalApi from '../../../config/api'

class Member extends React.Component {

    constructor() {
        super();
        this.state = {
            announcements: [],
            isLoading: true,
            err:null
        }

    }
    render() {
        return (
            
                
                <div className="admin-announcement-main-div">
                    <PostAnnouncement fetchAnnouncement={this.fetchAnnouncement}/>
                    <center><h4>Previous Announcement</h4></center>
                    <DisplayAnnouncement {...this.state} fetchAnnouncement={this.fetchAnnouncement}/>
                </div>
            
        );

    }
    fetchAnnouncement = () => {
        
        fetch(`${GloabalApi.announcementApi}Announcement/all`).then(
            (response) => {
                response.json().then((data) => {
                    if (data.success) {
                        
                        this.setState({ announcements: data.data, isLoading: false });
                        
                    }
                    else {

                        this.setState({ isLoading: false, err: data.message })
                    }
                })

            }
        ).catch((err) => {

            this.setState({ isLoading: false, err: err.message })
        }

        );

    }
}
class PostAnnouncement extends React.Component {
    constructor(){
        super();
        this.state={
            announcement:""
        }
    }

    render() {
        return (<div className="announcement-post" >
            <textarea cols={80} value={this.state.announcement} rows="4" onChange={(evt)=>{
                this.setState({announcement:evt.target.value});
            }}></textarea>
            <button onClick={()=>{
                this.PostAnnouncement();
            }}>Submit</button>
        </div>);
    }
    PostAnnouncement=()=>{
       var body={
           announcement:this.state.announcement
       }
        fetch(`${GloabalApi.announcementApi}Announcement`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then((response) => {

            response.json().then((data) => {
                
                if (data.success) {
                    alert("Announcement Posted");
                    this.setState({ announcement:"" });
                    this.props.fetchAnnouncement();
                     
                }
                else {
                    alert(data.message);

                }
            });
        }).catch(() => alert("Error sending data"));
    }
}


class DisplayAnnouncement extends React.Component {
    
    componentDidMount() {
        this.props.fetchAnnouncement();
        
    } 
    

    render() {
        if(!this.props.isLoading&&!this.props.err)
        return (<div>
            {this.props.announcements.map((announcement) => {
                return (
                    <div className="admin-announcement-display" key={announcement._id}>
                    
                        <span id="admin-date">{new Date(announcement.createAt).toDateString()}</span>
                        <p>{announcement.announcement}</p>
                    </div>
                )
            })
            }
        </div>);
        else if (this.props.isLoading) return <p>Loading...</p>
        else if (this.props.err) return <p>Error while fetching data</p>
    }
}
export default Member;