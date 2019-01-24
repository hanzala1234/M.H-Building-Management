import React from 'react';
import Header from '../header/header'
import GlobalApi from '../../config/api'
import {Link} from 'react-router-dom'
class Signup extends React.Component {
    constructor() {
        super();
        this.state = {
            email: null,
            password: null,
            name: null,
            contact: null,
            flatNo: null,
            img: null
        }
    }

    render() {

        return (

            <div>
                <Header />
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
                                        this.setState({ name: evt.target.value });
                                    }} size='30' required />
                                </td>

                            </tr><tr>
                                <td>
                                    Email
                   </td>
                                <td>
                                    <input type="Email" onChange={(evt) => {
                                        this.setState({ email: evt.target.value });

                                    }} size='30' required />
                                </td>

                            </tr>
                            <tr>
                                <td>
                                    Password
                   </td>
                                <td>
                                    <input type="password" onChange={(evt) => {
                                        this.setState({ password: evt.target.value });
                                    }} size='30' />
                                </td>

                            </tr><tr>
                                <td>
                                    contact
                   </td>
                                <td>
                                    <input type="text" onChange={(evt) => {
                                        this.setState({ contact: evt.target.value });

                                    }} size='30' />
                                </td>

                            </tr>
                            <tr>
                                <td>
                                    flatNo:
                   </td>
                                <td>
                                    <input type="text" onChange={(evt) => {
                                        this.setState({ flatNo: evt.target.value });
                                    }} size='30' />
                                </td>

                            </tr><tr>
                                <td>
                                    image
                   </td>
                                <td>
                                    <input type="file" onChange={(evt) => {
                                        this.setState({ img: evt.target.files[0] });

                                    }} size='30' />
                                </td>

                            </tr>
                        </tbody>
                    </table>
                    <button onClick={this.signup}> Submit </button>
                    <Link to="/login" id="signup-link">Already have an Account?</Link>

                </div>

            </div>)
    }
   
    signup = () => {
        const { email, password, name, contact, flatNo, img } = this.state;
        var form = new FormData();
        form.append("name", name); form.append("email", email);
        form.append("password", password);
        form.append("img", img);
        form.append('contact', contact);
        form.append("flatNo", flatNo);




        fetch( `${GlobalApi.memberApi}member/signup`, {
            method: 'POST',

            body: form
        }).then((response) => {
            response.json().then((data) => {
                if (data.success) {
                    alert("Your request has been made to admin,kindly wait for approval");


                }
                else {
                    alert(data.message.message);
                }
            });
        }).catch(() => alert("Error sending data"));


    }
}

export default Signup;
