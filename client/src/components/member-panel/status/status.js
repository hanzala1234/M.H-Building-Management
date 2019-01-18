import React from 'react'
import './status.css'
import NavBar from '../navBar/navBar'

class Status extends React.Component {

    
    render() {
        return (
            <div>
                <NavBar />
                <div className='main-div'>
                    <div className='main-center-div'>

                        <div className="status-div">

                            <Profile />
                            <h2>My Complain/Suggestions</h2>
                            <div className="message-box">
                                <Messages />
                            </div>
                        </div></div>
                </div></div>
        );
    }
}

class Profile extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            flatNo: '',
            paymentBalance: ""
        }
    }
    componentDidMount() {
        this.fetchProfile();
    }

    render() {
        return (
            <div>
                <center><h1> My Profile</h1></center>
                <div className='status-top'>
                    <table>
                        <tr><th>Name</th><th>Flat No</th></tr>
                        <tr><td>{this.state.name}</td><td>{this.state.flatNo}</td></tr>
                        <tr><th colSpan="2">payment Balanced</th></tr>
                        <tr><td colSpan="2">{this.state.paymentBalance}</td></tr>
                    </table>
                    <img src={this.state.image} />
                </div></div>);
    }







    fetchProfile = () => {
        fetch('http://localhost:8080/member/' + sessionStorage.getItem("user_id") + "/profile").then(
            (data) => {
                data.json().then((data1) => {
                    if (data1.success) {
                        console.log(data1);
                        this.setState({ ...data1.data, isLoading: false })
                    }
                    else {
                        this.setState({ isLoading: false, err: data1.message })
                    }
                })

            }
        ).catch((err) => {
            this.setState({ isLoading: false, err: err })
        }

        );
    }
}

class Messages extends React.Component {
    constructor() {
        super();
        this.state = {
            messages: [],
            isLoading: false,
            err: null
        }

    }
    componentDidMount() {
        this.fetchMessage();
    }
    render() {
        if (!this.state.isLoading && !this.state.err) {
            return (
                <div>

                    {this.state.messages.map((message) => {
                        return (
                            <div className="message">
                                <span id='date'>{message.createAt}</span>
                                <p>{message.message}</p>

                            </div>
                        );
                    })}



                </div>
            );
        }
        else if (this.state.isLoading) return <p>Loading....</p>
        else if (this.state.err) return <p>Error while fetching data</p>
    }
    fetchMessage = () => {
        fetch('http://localhost:8020/messages/message/' + sessionStorage.getItem("user_id")).then(
            (response) => {
                response.json().then((data) => {
                    
                    if (data.success) {

                        this.setState({ messages: data.data, isLoading: false })
                    }
                    else {
                        this.setState({ isLoading: false, err: data.message })
                    }
                })

            }
        ).catch((err) => {
            this.setState({ isLoading: false, err: err })
        }

        );
    }
}


export default Status;