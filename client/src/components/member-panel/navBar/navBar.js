import React from 'react';
import  './memberNavBar.css';
import Members from '../Member/Member'
import Header from '../../header/header'
import Budget from '../Budget/budget'
import Message from '../Sugg-comp/message'
import Status from '../status/status'
import { Link, Route,Switch } from 'react-router-dom'
import Announcement from '../Announcement/Announcement';

function navBar({match,location,setMemberLogin}) {
    
    return (
        <div>
            <Header />
        <div className='member-navbar'>
            {/* {console.log(match)
            } */}
            
            <ol>

                <li> <Link to={match.url+"/members"}>Members</Link></li>
                <li><Link to={match.url+"/Announcement"}>Annoucement</Link></li>
                <li> <Link to={match.url+'/message'}>Comp/Sugg</Link></li>
                <li><Link to={match.url+'/budget'}>Budget</Link></li>
               
                <li> <Link to={match.url+'/status'}>My Status</Link></li>

            </ol>
            
                
        </div>
        
        <Switch>
            
        <Route   path={match.path+"/members"} component={Members} />
        <Route   path={match.path+"/Announcement"} component={Announcement} />
        <Route   path={match.path+"/message"} component={Message} />
        <Route   path={match.path+"/budget"} component={Budget} />
        <Route   path={match.path+"/Status"} render={(props)=><Status {...props} setMemberLogin={setMemberLogin}/>} />
        <Route exact path={match.path+'/'}/>
        <Route component={NotFound}/>
        </Switch>   
        </div>
        );

}
const NotFound = () => <p><center>Error 404 page not found</center></p>
export default navBar;