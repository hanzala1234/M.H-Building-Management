import React from 'react';
import Header from '../header/header';
import GlobalApi from '../../config/api';
import {Link} from 'react-router-dom'
class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            role: ''
        }
    }

    render() {

        return (

            <div>
                <Header />
                <div className="login-main-div">

                    <center><h3> User Login</h3></center>

                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    Email
                   </td>
                                <td >
                                    <input type="text" onChange={(evt) => {
                                        this.setState({ email: evt.target.value });
                                    }} size='30' />
                                </td>

                            </tr><tr>
                                <td>
                                    Password
                   </td>
                                <td >
                                    <input type="password" onChange={(evt) => {
                                        this.setState({ password: evt.target.value });

                                    }} size='30' />
                                </td>

                            </tr>
                            <tr>
                                <td>
                                    role
                   </td>
                                        
                                <td id="radio">

                                    <input type="radio" name="role" value="member" onChange={(evt) => {
                                        this.setState({ role: evt.target.value });

                                    }} />
                                    Member
                                <input type="radio" name="role" value="admin" onChange={(evt) => {
                                        this.setState({ role: evt.target.value });

                                    }} />
                                    Admin
                           </td>

                            </tr>

                        </tbody>
                    </table>
                    <button onClick={this.login}> Submit </button>

                    <Link id="signup-link" to="/signup">Create An Account</Link>
                </div>

            </div>)
    }

    login = () => {
        const { email, password, role } = this.state;
        if (!email || !password || !role) return alert('please fill all fields');

        var data = {
            email: email,
            password: password,
            role: role
        }


        fetch(`${GlobalApi.memberApi}member/login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((response) => {
            response.json().then((data) => {
                if (data.success) {
                    if (data.result.role === "member") {

                        this.props.setMemberLogin(true);
                        sessionStorage.setItem('isLogin', 'true');
                        sessionStorage.setItem('user_id', data.result._id);
                        sessionStorage.setItem('user_name', data.result.name);
                    }
                    if (data.result.role === "admin") {
                        this.props.setAdminLogin(true);
                    }

                }
                else {
                    alert(data.message);
                }
            });
        }).catch(() => alert("Error sending data"));


    }
}

export default Login;
