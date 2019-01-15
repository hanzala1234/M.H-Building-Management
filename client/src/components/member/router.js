import React from 'react';
import Header from './header';
import { BrowserRouter } from 'react-router-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Members from './routes/Member/Member'
import Announcement from './routes/Announcement/Announcement'
import NavBar from './navBar'
import Status from './routes/status/status'
import Budget from './routes/Budget/budget'
import message from './routes/Sugg-comp/message'
class Member extends React.Component {

    
    render() {

        return (
            <BrowserRouter>
            <Router>
                <div>

                    <Header />
                    
                        <NavBar />
                    
                    
                    <switch>
                        <Route exact path='/members' component={Members} />
                        <Route exact path='/Announcement' component={Announcement} />
                        <Route exact path='/message' component={message}/>
                        <Route exact path='/budget' component={Budget}/>
                        <Route exact path='/status' component={Status}/>
                    </switch>

                    
                </div>
            </Router>
            </BrowserRouter>
        );
    };

}
export default Member;