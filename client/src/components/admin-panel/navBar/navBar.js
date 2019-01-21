import React from 'react'
import './navBar.css'
class NavBar extends React.Component{

    render(){
        return(
            <div>
        <div className='navBar'>
        <li> Members</li>
        <li> Budget</li>
        <li> pending request</li>
        <li> Announcement</li>
        </div>
        
        </div>
        );
    }

}
export default NavBar;