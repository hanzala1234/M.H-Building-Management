import React from 'react';
import './pending.css'
import NavBar from '../navBar/navBar'

class Pending extends React.Component {

    render() {
        return (
            <div class="pending">
                <NavBar />
                <div class="main-div">
                <h2>Pending Request</h2>
                <Members/>
                </div>
            </div>
        );

    }
}
class Members extends React.Component{
    constructor(){
        super();
        this.state={
            members:[{
                name:"muzammil sikander",
                flatNo:"F-3",
                contact:"03403659827",
                image:"images/pic1.jpg"
            },
            {
                name:"Muhammad Hanzala",
                flatNo:"S-2",
                contact:"03366831412",
                image:"images/pic1.jpg"
            }            
        ]
        }
    }
    render() {
        return (
            <div>
            
            {this.state.members.map((member)=>{
                    return(
                        <div class="members">
            <img src={member.image}/>
            <ul>
                <li>{member.name}</li>
                <li>{member.flatNo}</li>

            </ul>
            <ul>
                <li>Phone No</li>
                <li>{member.contact}</li>

            </ul>
            <div className="button">
            <button><img src="images/accept.png"/>Accept</button>
            <button><img src="images/reject.png"/>Reject</button>
            </div>
            </div>
                    );
            })}
            
            
            </div>
        );

    }
}
export default Pending;