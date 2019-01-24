import React from 'react'
import './navBar.css'
import Members from '../member/member'
import Announcement from '../announcement/announcement'
import Budget from '../budget/budget'
import Pending from '../pending-request/pending'


import { Link, Route,Switch } from 'react-router-dom'
function NavBar({ match }) {


        return (
                <div className="admin-members">
                        <div className='navBar'>
                                <li> <Link to={match.url + "/members"}>Members</Link></li>
                                <li><Link to={match.url + "/Announcement"}>Annoucement</Link></li>
                                <li> <Link to={match.url + '/pending'}>Pending Request</Link></li>
                                <li><Link to={match.url + '/budget'}>Budget</Link></li>
                        </div>
                        <Switch>
                        <Route exact path={match.path + "/members"} component={Members} />
                        <Route exact path={match.path + "/Announcement"} component={Announcement} />
                        <Route exact path={match.path + "/pending"} component={Pending} />
                        <Route exact path={match.path + "/budget"} component={Budget} />
                        <Route exact path={match.path+'/'}/>
                        <Route component={NotFound}/>
                        </Switch>

                </div>
        );


}
const NotFound = () => <p><center>Error 404 page not found</center></p>
export default NavBar;