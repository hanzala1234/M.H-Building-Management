import React from 'react';
import './pending.css'
import GloabalApi from '../../../config/api'
import accept from '../../../images/accept.png'
import reject from '../../../images/reject.png'

class Pending extends React.Component {

    render() {
        return (


            <div className="admin-pending-div">
                <h2>Pending Request</h2>
                <Members />
            </div>

        );

    }
}
class Members extends React.Component {
    constructor() {
        super();
        this.state = {
            members: []
        }
    }
    componentDidMount() {
        this.fetchPendingRequest();
    }
    render() {
        return (
            <div>

                {this.state.members.map((member) => {
                    return (
                        <div className="pending-members" key={member._id}>
                            <img  alt={member.name} src={member.image} />
                            <ul>
                                <li>{member.name}</li>
                                <li>{member.flatNo}</li>

                            </ul>
                            <ul>
                                <li>Phone No</li>
                                <li>{member.contact}</li>

                            </ul>
                            <div className="button">
                                <button onClick={() => {
                                    this.accept(member);
                                }}><img alt="accept" src={accept} />Accept</button>
                                <button onClick={() => {
                                    this.reject(member);
                                }}><img alt="reject" src={reject} />Reject</button>
                            </div>
                        </div>
                    );
                })}


            </div>
        );

    }
    accept = (member) => {
        var body = {
            id: member._id
        }
        fetch(`${GloabalApi.memberApi}member/pending/accept`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then((response) => {

            response.json().then((data) => {

                if (data.success) {


                    this.fetchPendingRequest();

                }
                else {
                    alert(data.message);

                }
            });
        }).catch(() => alert("Error sending data"));
    }
    reject = (member) => {
        var body = {
            id: member._id
        }
        fetch(`${GloabalApi.memberApi}member/pending/delete`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then((response) => {

            response.json().then((data) => {

                if (data.success) {


                    this.fetchPendingRequest();

                }
                else {
                    alert(data.message);

                }
            });
        }).catch(() => alert("Error sending data"));
    }
    
    fetchPendingRequest = () => {

        fetch(`${GloabalApi.memberApi}member/pending`).then(
            (response) => {
                response.json().then((data) => {
                    if (data.success) {

                        this.setState({ members: data.data, isLoading: false });

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
export default Pending;