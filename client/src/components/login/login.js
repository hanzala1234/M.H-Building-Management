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
          }).then((response)=>{
              response.json().then((data)=>{
                    if(data.success){
                        this.props.login(true); 
                       sessionStorage.setItem('isLogin','true');
                       sessionStorage.setItem('user_id',data.result._id);
                       sessionStorage.setItem('user_name',data.result.name);
                       
                        
                    }
                    else{
                        alert(data.message);
                    }
              });
          }).catch(()=>alert("Error sending data"));  
        
       
    }
    render() {

        return (

            <div>
                {/* <Header/> */}
                <div className="login-main-div">
                    {console.log("login value"+this.props.isLogin)}
                    <center><h3> User Login</h3></center>

                    <table>
                        <tr>
                            <td>
                                Email
                   </td>
                            <td>
                                <input type="text" onChange={(evt) => {
                                    this.setState({ email: evt.target.value });
                                }} size='30' />
                            </td>

                        </tr><tr>
                            <td>
                                Password
                   </td>
                            <td>
                                <input type="password" onChange={(evt) => {
                                    this.setState({ password: evt.target.value });

                                }} size='30' />
                            </td>

                        </tr>
                    </table>
                    <button onClick={this.login}> Submit </button>
                    <a href="">Login as an Admin</a>
                   
                </div>

            </div>)
    }
}

export default Login;
