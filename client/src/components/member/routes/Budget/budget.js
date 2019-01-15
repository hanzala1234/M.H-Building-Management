import React from 'react'
import './budget.css'
let datearray=[];
var today= new Date();
for(var i=0;i<6;today.setMonth(today.getMonth()-1)){
    var months=["jan","feb","march","April","May","june",'july','aug','sept','oct','nov','dec'];
    i++;
    datearray.push(months[today.getMonth()]);
}
console.log(datearray);
class Budget extends React.Component{
    constructor(){
        super();
        this.state={
            announcements:[{
                date:"3-May-2018",
                message:"Mr Hassan your amount of 1000 is due,kindly pay is as soon as possible"
            },{
                date:"4-June-2018",
                message:"Motor will not turn on today,kindly arrange "
            }
        ]
        }
    }
    render(){
        return(
        <div className='main-div'>
        <div className='main-center-div'>
       <center>   <h1>Budget</h1> </center>
       <div className="budget-div">
       <spam className="selector">
      
       Month: 
       <select>
        {datearray.map((date)=>{
            return <option>{date}</option>
        })}

       </select>
       </spam>
       <center><h3>June-2018</h3></center>
       
                        <table>
                            <tr><td>previous Month savings</td>
                            <td> 2000</td>
                            </tr>
                            <tr><td>Current Month Income</td>
                            <td> 4000</td>
                            </tr>
                            <tr><td>Motor Reparing</td>
                            <td> 300</td>
                            </tr>
                            <hr/>
                            <tr><td>total</td>
                            <td> 5000</td>
                            </tr>
                        </table>

       </div>
        </div>
        </div>
        );
    }
}
export default Budget;