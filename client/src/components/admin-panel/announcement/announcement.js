import React from 'react';
import './announcement.css'
import NavBar from '../navBar/navBar'

class Member extends React.Component {

    render() {
        return (
            <div class="announcement">
                <NavBar />
                <div class="main-div">
                <PostAnnouncement/>
                <center><h4>Previous Announcement</h4></center>
                <DisplayAnnouncement/>
                </div>
            </div>
        );

    }
}
class PostAnnouncement extends React.Component{

        render(){
            return(<div className="announcement-post" >
                    <textarea cols={80} rows="4"></textarea>
                    <button>Submit</button>
            </div>);
        }
}
class DisplayAnnouncement extends React.Component{
    render(){
        return(<div  >
            <div className="announcement-display">
            <span id="date">3-May-2018</span>
            <p>Amount have to be cleared before 20 may,so that we dont have to pay penalty</p>
            </div>
            <div className="announcement-display">
            <span id="date">3-May-2018</span>
            <p>Amount have to be cleared before 20 may,so that we dont have to pay penalty,k pak kjdkjf pak
                dkj kdjfkd kjdfk jkdf
            </p>
            </div>
                
        </div>);
    }
}
export default Member;