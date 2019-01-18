import React from 'react'
import './budget.css'
import NavBar from '../navBar/navBar'


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
        var date = new Date();
        this.fetchBudget(date.getMonth(), date.getFullYear());
    }

    render() {
        return (
            <div>

                <NavBar />
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

        fetch('http://localhost:8050/Budget/' + month + "/" + year).then(
            (response) => {
                console.log('received');
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
                <tr><td>previous Month savings</td>
                    <td> {props.savings}</td>
                </tr>
                <tr><td>Current Month Income</td>
                    <td> {props.income}</td>
                </tr>
                {props.expense.map((expense) => {
                    return <tr><td>{expense.title}</td>
                        <td>{expense.amount}</td>
                    </tr>
                })}

                <hr />
                <tr><td>total</td>
                    <td> {props.total}</td>
                </tr>
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
                    return <option>{date}</option>
                })}

            </select>
        </span>
    );
}

export default Budget;