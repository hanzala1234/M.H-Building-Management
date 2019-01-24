import React from 'react';

// import { BrowserRouter } from 'react-router-dom'
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom'

import MemberNav from './components/member-panel/navBar/navBar'
import AdminNav from './components/admin-panel/navBar/navBar'

import Login from './components/login/login'
import Signup from './components/signup/signup'







class myRouter extends React.Component {
    constructor() {
        super();
        this.state = {

            memberLogin: sessionStorage.getItem('isLogin'),
            adminLogin: false

        }
    }


    render() {

        return (
            <Router >


                <div>




                    <Switch>
                        <LoginRoute exact path='/login' {...this.state} setMemberLogin={this.setMemberLogin}
                            setAdminLogin={this.setAdminLogin}
                            Component={Login} />
                        <LoginRoute exact path='/' {...this.state} memberlogin={this.setMemberLogin}
                            adminLogin={this.setAdminLogin}
                            Component={Login} />
                        <Route exact path="/signup" component={Signup} />
                        <Route exact path="/unauth" component={unauth} />
                        <MemberRouter path={'/member'} setMemberLogin={this.setMemberLogin} {...this.state} component={MemberNav} />
                        <AdminRouter path={'/admin'} {...this.state} component={AdminNav} />
                        <Route component={NotFound}/>
                        </Switch>

                    

                </div>


            </Router>
        );
    }
    setMemberLogin = (value) => {
        this.setState({ memberLogin: value });
    }
    setAdminLogin = (value) => {
        this.setState({ adminLogin: value });
    }

}

function MemberRouter(props) {

    const Component = props.component;
    return (
        <Route path={props.path} render={routerProps =>
            props.memberLogin ? (<Component {...routerProps} {...props} />) :
                (<Redirect
                    to={{ pathname: "/unauth", state: { from: routerProps.location } }} />)

        } />

    );
}

function AdminRouter(props) {
    
    const Component = props.component;
    return (
        <Route path={props.path} render={props1 =>
            props.adminLogin ? (<Component {...props1} {...props} />) :
                (<Redirect
                    to={{ pathname: "/unauth", state: { from: props1.location } }} />)

        } />

    );
}

function LoginRoute(props) {

    return (

        <Route exact path={props.path} render={routerProps => {

            if (props.memberLogin)
                return <Redirect
                    to={{ pathname: "/member", state: { from: routerProps.location } }} />
            else if (props.adminLogin)
                return <Redirect
                    to={{ pathname: "/admin", state: { from: routerProps.location } }} />

            else
                return <props.Component {...routerProps} {...props} />
        }
        }

        />

    );
}
const unauth = () => <p>You are not not logged in please <Link to="/login">login </Link> to see this page</p>

const NotFound = () => <p><center>Error 404 page not found</center></p>

export default myRouter;