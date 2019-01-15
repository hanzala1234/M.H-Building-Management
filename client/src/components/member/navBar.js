import React from 'react';
import './navBar.css';

import {BrowserRouter as Router,Link,Switch,Route} from 'react-router-dom'
function navBar() {

    return (
        <div className='navBar'>

            <ol>

                <li><Link to={"/members"}>Members</Link></li>
                <li><Link to={"/Announcement"}>Annoucement</Link></li>
                <li> <Link to={'/message'}>Comp/Sugg</Link></li>
                <li><Link to={'/budget'}>Budget</Link></li>

                <li> <Link to={'/status'}>My Status</Link></li>

            </ol>

        </div>
        );

}

export default navBar;