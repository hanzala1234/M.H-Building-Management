import React from 'react'

import './status.css'
import GlobalApi from '../../../config/api';


class Status extends React.Component {


    render() {
        return (

            <div>

                <div className='main-div'>
                    <div className='main-center-div'>

                        <div className="status-div">

                            <Profile history={this.props.history} setMemberLogin={this.props.setMemberLogin} />
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

                <button id="logout" onClick={() => {
                    this.logout();
                }}> logout</button>
                <div className='status-top'>
                    <table>
                        <tbody>
                            <tr><th>Name</th><th>Flat No</th></tr>
                            <tr><td>{this.state.name}</td><td>{this.state.flatNo}</td></tr>
                            <tr><th colSpan="2">payment Balanced</th></tr>
                            <tr><td colSpan="2">{this.state.paymentBalance}</td></tr>
                        </tbody>
                    </table>
                    <img src={this.state.image} alt={this.state.name} />
                </div></div>);
    }





    logout = () => {
        sessionStorage.setItem('isLogin', "");
        sessionStorage.setItem('user_name', "");
        sessionStorage.setItem('user_id', "");
        this.props.setMemberLogin(false);
        this.props.history.replace('/login');
    }

    fetchProfile = () => {
        const user_id = sessionStorage.getItem("user_id");

        fetch(`${GlobalApi.memberApi}member/${user_id}/profile`).then(
            (data) => {
                data.json().then((data1) => {
                    if (data1.success) {

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
                            <div className="message" key={message._id}>
                                <span id='date'>{new Date(message.createAt).toDateString()}</span>
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
        const user_id = sessionStorage.getItem('user_id');

        fetch(`${GlobalApi.messageApi}messages/message/${user_id}`).then(
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