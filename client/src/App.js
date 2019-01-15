import React from 'react';
import Header from './header';

class App extends React.Component {

  
  render(){

      return(
          
      <div>
          <Header/>
           <div className="login-main-div">
           
           <center><h3> User Login</h3></center>
         
           <table>
           <tr>
               <td>
                   Email
                   </td>
                   <td>
                   <input type="text"  size='30'/>
                   </td>

               </tr><tr>
               <td>
                   Password
                   </td>
                   <td>
                   <input type="password"  size='30'/>
                   </td>

               </tr>
           </table>
           <button> Submit </button>
           <a href="google.com">Login as an Admin</a>
           </div>
           
</div>)
  }
}

export default App;
