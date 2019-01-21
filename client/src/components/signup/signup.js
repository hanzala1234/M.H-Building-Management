import React from 'react';



class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: ''
        }
    }
    login = () => {
        const { email, password } = this.state;
        var data = {
            email: email,
            password: password
        }


        fetch('http://localhost:8080/member/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((response) => {
            response.json().then((data) => {
                if (data.success) {
                    this.props.login(true);
                    sessionStorage.setItem('isLogin', 'true');
                    sessionStorage.setItem('user_id', data.result._id);
                    sessionStorage.setItem('user_name', data.result.name);


                }
                else {
                    alert(data.message);
                }
            });
        }).catch(() => alert("Error sending data"));


    }
    render() {

        return (

            <div>
                {/* <Header/> */}
                <div className="signup-main-div">

                    <center><h3> User Signup</h3></center>

                    <table>
                        <tbody>
                        <tr>
                            <td>
                                Name
                   </td>
                            <td>
                                <input type="text" onChange={(evt) => {
                                    this.setState({ email: evt.target.value });
                                }} size='30'  required/>
                            </td>

                        </tr><tr>
                            <td>
                                Email
                   </td>
                            <td>
                                <input type="Email" onChange={(evt) => {
                                    this.setState({ password: evt.target.value });

                                }} size='30'  required/>
                            </td>

                        </tr>
                        <tr>
                            <td>
                                Password
                   </td>
                            <td>
                                <input type="password" onChange={(evt) => {
                                    this.setState({ email: evt.target.value });
                                }} size='30' />
                            </td>

                        </tr><tr>
                            <td>
                                contact
                   </td>
                            <td>
                                <input type="text" onChange={(evt) => {
                                    this.setState({ password: evt.target.value });

                                }} size='30' />
                            </td>

                        </tr>
                        <tr>
                            <td>
                                flatNO:
                   </td>
                            <td>
                                <input type="text" onChange={(evt) => {
                                    this.setState({ email: evt.target.value });
                                }} size='30' />
                            </td>

                        </tr><tr>
                            <td>
                                image
                   </td>
                            <td>
                                <input type="file" onChange={(evt) => {
                                    this.setState({ password: evt.target.value });

                                }} size='30' />
                            </td>

                        </tr>
                        </tbody>
                    </table>
                    <button onClick={this.login}> Submit </button>
                    <a href="someting">Login as an Admin</a>

                </div>

            </div>)
    }
}

export default Login;
