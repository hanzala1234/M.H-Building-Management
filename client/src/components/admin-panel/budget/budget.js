import React from 'react';
import './budget.css'
import NavBar from '../navBar/navBar'

class Budget extends React.Component {

    render() {
        return (
            <div class="budget">
                <NavBar />
                <div class="main-div">
                <PostBudget/>
                <Expenses/>
                </div>
            </div>
        );

    }
}
class PostBudget extends React.Component{
    render(){
        return(<div className="budget-post">
            Title <input type="text" size="80" id="title"/>
            <br/>
            Date <input type="date"/>
            Amount <input type="Number"/><br/>
            <button><span className="plus">+</span>Submit</button>


        </div>);
    }
}
class Expenses extends React.Component{
    constructor(){
        super();
        this.state={
            expenses:[{
                Date:"13-may-2018",
                title:"Motor Repairing",
                amount:3000
            },
            {
                Date:"22-may-2019",
                title:"Sweepers Salary",
                amount:1000
            }]
            
        }
    }
    render(){
        return(<div className="expenses">
            <center><h4>Current Month Expenses</h4></center>
            <table>
                <thead>
                    <tr><th>Date </th>
                        <th>Title</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.expenses.map((expense)=>{
                         return <tr>
                         <td>{expense.Date}</td>
                         <td>{expense.title}</td>
                         <td>{expense.amount}</td>
                     </tr>
                    })}
                    
                </tbody>
                <tfoot>
                    <tr>
                        <td>Total</td>
                        <td></td>
                        <td>{this.calculateTotal()}</td>
                    </tr>
                    
                    </tfoot>        
                        
                        
                    
                

            </table>
            <center><button onClick={()=>{
                var first=prompt("Enter amount");
                var second=prompt("Reenter amount");
                if(first!=second) alert("Please Enter same amount both time");
                
            }}> Add Member Balance</button></center>

        </div>);
    }
    calculateTotal=()=>{
        var total=0;
        
        this.state.expenses.map((each) => {
            total += each.amount;
        })
        return total;
    }
}
export default Budget;