import React from 'react';
import './budget.css'
import GloabalApi from '../../../config/api'

class Budget extends React.Component {
    constructor() {
        super();
        this.state = {
            expenses: []
        }
    }
    render() {
        return (


            <div className="admin-budget-div">
                <PostBudget fetchExpense={this.fetchExpense} />
                <Expenses expenses={this.state.expenses} fetchExpense={this.fetchExpense} total={this.calculateTotal()} />
                <center>
                    <button onClick={() => {
                        this.addBalance();

                    }}>Add Member Balance</button>
                </center>
            </div>

        );

    }

    fetchExpense = () => {

        fetch(`${GloabalApi.budgetApi}budget/spent`).then(
            (response) => {

                response.json().then((data) => {
                    if (data.success) {


                        this.setState({ isLoading: false, expenses: data.data });
                        this.setState({ total: this.calculateTotal(data.income, data.savings, data.expense) });
                    }
                    else {

                        this.setState({ isLoading: false, err: data.message })
                    }
                })

            }
        ).catch((err) => {

            this.setState({ isLoading: false, err: err })
        }

        );

    }
    calculateTotal = () => {
        var total = 0;

        this.state.expenses.map((each) => {
            total += each.amount;
        })
        return total;
    }

    addBalance = () => {
        var first = prompt("Enter amount");
        var second = prompt("Reenter amount");
        if (first !== second) alert("Please Enter same amount both time");

        var data = {
            amount: first
        }

        fetch(`${GloabalApi.memberApi}member/payment/add`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((response) => {

            response.json().then((data) => {
                if (data.success) {
                    alert("Amount has been successfully added in member balance");
                }
                else {
                    alert("Amount could not be added,please try again later");
                }
            }
            )
        }
        ).catch(() => alert("Request could not be sent"));
    }

}

class PostBudget extends React.Component {
    constructor() {
        super();
        this.state = {
            amount: "",
            title: "",
            date: "",

        }
    }
    render() {
        return (<div className="budget-post">
            Title <input type="text" size="80" id="title" value={this.state.title} onChange={(evt) => {
                this.setState({ title: evt.target.value });
            }} />
            <br />
            Date <input type="date" onChange={(evt) => {
                this.setState({ date: evt.target.value });
            }} value={this.state.date} />
            Amount <input type="Number" onChange={(evt) => {
                this.setState({ amount: evt.target.value });
            }} value={this.state.amount} /><br />
            <button onClick={() => {
                this.submit();
            }}><span className="plus">+</span>Submit</button>


        </div>);
    }
    submit = () => {
        var { date, amount, title } = this.state;

        var body = {
            Date: date,
            amount: amount,
            title: title
        };
        this.postBudget(body);
    }

    postBudget = (body) => {
        fetch(`${GloabalApi.budgetApi}budget/spent`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then((response) => {

            response.json().then((data) => {
                console.log(data);
                if (data.success) {
                    alert("data successfully added");
                    this.setState({ Date: null, amount: "", title: "" });
                    this.props.fetchExpense();

                }
                else {
                    alert(data.err.message);

                }
            });
        }).catch(() => alert("Error sending data"));
    }

}

class Expenses extends React.Component {

    componentDidMount() {
        this.props.fetchExpense();
    }
    render() {
        if (!this.props.isLoading && !this.props.err)
            return (<div className="expenses">
                <center><h4>Current Month Expenses</h4></center>
                <table>
                    <thead>
                        <tr><th>Date </th>
                            <th>Title</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.expenses.map((expense) => {
                            return <tr key={expense._id}>
                                <td>{new Date(expense.Date).toDateString()}</td>
                                <td>{expense.title}</td>
                                <td>{expense.amount}</td>
                            </tr>
                        })}

                    </tbody>
                    <tfoot>
                        <tr>
                            <td>Total</td>
                            <td></td>
                            <td>{this.props.total}</td>
                        </tr>

                    </tfoot>

                </table>


            </div>);
        else if (this.props.isLoading) return (<p>Loading..</p>);
        else if (this.props.err) return (<p>Error while fetching data</p>)

    }


}
export default Budget;