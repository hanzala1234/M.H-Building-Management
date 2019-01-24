import React from 'react'
import './budget.css'
import GloabalApi from '../../../config/api'


let datearray = [];

var today = new Date();

for (var i = 0; i < 6; today.setMonth(today.getMonth() - 1)) {
    var months = ["jan", "feb", "march", "April", "May", "june", 'july', 'aug', 'sept', 'oct', 'nov', 'dec'];
    i++;
    datearray.push(months[today.getMonth()] + " " + today.getFullYear());
}


class Budget extends React.Component {
    constructor() {
        super();
        this.state = {
            income: "",
            savings: "",
            total: 0,
            expense: [],
            isLoading: true,
            month:datearray[0]
        }
    }


    componentDidMount() {
        var date = this.state.month.split(' ');
                var month = date[0];
                var year = date[1];
        this.fetchBudget(month,year);
    }

    render() {
        return (
            <div>

              
                <div className='main-div'>
                    <div className='main-center-div'>
                        <center>   <h1>Budget</h1> </center>
                        <div className="budget-div">

                            <center><h3>{this.state.month}</h3></center>
                            <Selector fetchBudget={this.fetchBudget} setMonth={this.setMonth} />
                            {<DisplayBudget {...this.state} />}

                        </div>
                    </div>
                </div>        </div>
        );
    }

    fetchBudget = (month, year) => {
        
        fetch(`${GloabalApi.budgetApi}Budget/${month}/${year}`).then(
            (response) => {
                
                response.json().then((data) => {
                    if (data.success) {


                        this.setState({ isLoading: false, ...data });
                        this.setState({ total: this.calculateTotal(data.income, data.savings, data.expense) });
                    }
                    else {

                        this.setState({ isLoading: false, err: data.message })
                    }
                })

            }
        ).catch((err) => {
            console.log(err);
            this.setState({ isLoading: false, err: err })
        }

        );

    }
    setMonth=(month)=>{
        this.setState({month:month});
    }
    calculateTotal=(income, savings, expense)=> {
        var total = 0;
        total += income;
        total += savings;
        expense.map((each) => {
            total -= each.amount;
        })
        return total;
    }
}

function DisplayBudget(props) {
    
    if (!props.isLoading && !props.err)
        return (<div>
            <table>
                <tbody>
                <tr><td>previous Month savings</td>
                    <td> {props.savings}</td>
                </tr>
                <tr><td>Current Month Income</td>
                    <td> {props.income}</td>
                </tr>
                {props.expense.map((expense) => {
                    return <tr key={expense._id}><td>{expense.title}</td>
                        <td>{expense.amount}</td>
                    </tr>
                })}

                <hr />
                <tr><td>total savings</td>
                    <td> {props.total}</td>
                </tr>
                </tbody>
            </table>

        </div>);
    else if (props.isLoading) return <p>Loading....</p>
    else if (props.err) return <p>Error fetching data</p>
}

function Selector(props) {
    return (
        <span className="selector">

            Month:
<select onChange={(evt) => {
                var date = evt.target.value.split(' ');
                var month = date[0];
                props.setMonth(evt.target.value);
                var year = date[1];
                props.fetchBudget(month, year);


            }}>
                {datearray.map((date) => {
                    return <option key={date}>{date}</option>
                })}

            </select>
        </span>
    );
}

export default Budget;