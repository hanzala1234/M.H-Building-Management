import React from 'react';
import Header from './components/header/header';
import { BrowserRouter } from 'react-router-dom'
import { BrowserRouter as Router, Route, IndexRoute, Redirect, Link } from 'react-router-dom'
import Members from './components/member-panel/Member/Member'

import Announcement from './components/member-panel/Announcement/Announcement'
import Signup from './components/signup/signup'
import Login from './components/login/login'
import Status from './components/member-panel/status/status'
import Budget from './components/member-panel/Budget/budget'
import message from './components/member-panel/Sugg-comp/message'







function PrivateRouter(props) {


    return (
        <Route  exact path={props.path} render={props1 =>
            props.isLogin ? (<props.Component {...props1} {...props} />) :
                (<Redirect
                    to={{ pathname: "/unauth", state: { from: props1.location } }} />)

        } />

    );
}
function LoginRoute(props) {

    return (

        <Route exact  path={props.path} render={props1 =>
            props.isLogin ? (<Redirect
                to={{ pathname: "/members", state: { from: props1.location } }} />) :
                (<props.Component {...props1} {...props} />)

        } />

    );
}
const unauth = () => <p>You are not not logged in please <Link to="/login">login </Link> to see this page</p>

const notFound=()=><p><center>Error 404 page not found</center></p>
class myRouter extends React.Component {
    constructor() {
        super();
        this.state = {
           isLogin: sessionStorage.getItem('isLogin')
        //    isLogin: true
        }
    }
    setLogin = (value) => {
        this.setState({ isLogin: value });

    }

    render() {

        return (
            <BrowserRouter>
           
                <Router>
                    <div> 

                        <Header />


                         <switch>
                       
                        <LoginRoute exact path='/' {...this.state} login={this.setLogin} Component={Login} />
                        
                        <LoginRoute exact path='/login' {...this.state} login={this.setLogin} Component={Login} />
                        {/* <LoginRoute exact path='/' {...this.state} login={this.setLogin} Component={Login} /> */}
                        <Route exact path={"/unauth"} component={unauth} />
                        <Route exact path={"/signup"} component={Signup} />
                        <PrivateRouter {...this.state} path='/members' Component={Members} />
                        
                        <PrivateRouter {...this.state} path='/Announcement' Component={Announcement} />
                        <PrivateRouter {...this.state} path='/message' Component={message} />
                        <PrivateRouter path='/budget' {...this.state} Component={Budget} />
                        <PrivateRouter path='/status' {...this.state} Component={Status} />
                        {/* <Route exact path="*" component={notFound}/> */}
                        
                        </switch>


                    </div>
                </Router>
                
            </BrowserRouter>
        );
    };

}
export default myRouter;