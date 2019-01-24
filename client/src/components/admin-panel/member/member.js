import React from 'react';
import './member.css'
import GloabalApi from '../../../config/api'
import Popup from "reactjs-popup";


class Member extends React.Component {

    render() {
        return (


            <MembersDisplay />


        );

    }
}

class MembersDisplay extends React.Component {
    constructor() {
        super();
        this.state = {
            members: [],
            isLoading: false,
            err: null,
            amount: 0,
            reamount: 0
        }
    }
    componentDidMount() {
        this.fetchMembers();
    }
    render() {
        if (!this.state.isLoading && !this.state.err)
            return (
                <div className="member-display">
                    <h2>Members</h2>
                    <table>
                        <thead>
                            <tr>
                                <td></td>
                                <th>Name</th>
                                <th>Flat</th>
                                <th>Balance</th>
                                <td></td>
                                <td></td>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.members.map((member) => {
                                return (


                                    <tr key={member._id}>
                                        <td><img src={member.image} alt={member.name}/></td>
                                        <td>{member.name}</td>
                                        <td>{member.flatNo}</td>
                                        <td>{member.paymentBalance}</td>

                                        <td><button id="payment_alert" onClick={() => {
                                            this.paymentAlert(member);
                                        }}>Payment Alert</button></td>

                                        <td>
                                            <AddPayment member={member} fetchMembers={this.fetchMembers} />
                                        </td>
                                    </tr>






                                )
                            })}
                        </tbody>
                    </table>
                </div>
            );
        else if (this.state.isLoading) return (<p>Loading....</p>);
        else if (this.state.err) return (<p>Error fetching data</p>);
    }

    fetchMembers = () => {
        fetch(`${GloabalApi.memberApi}member/all`).then(
            (response) => {
                response.json().then((data) => {
                    if (data.success) {
                        // console.log(data1);
                        this.setState({ members: data.data, isLoading: false })
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


    paymentAlert = (member) => {
        var body = {
            memberId: member._id,
            announcement: "Mr: " + member.name + "! your amount of " + member.paymentBalance + " id due. kindly Pay ASAP"
        }

        fetch(`${GloabalApi.announcementApi}announcement/alert`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then((response) => {

            response.json().then((data) => {
                if (data.success) {
                    alert("payment alert has been sent to Mr" + member.name);
                }
                else {
                    alert("payment alert could not be sent");
                }
            })
        }).catch(() => {
            alert("payment alert could not be sent");
        });

    }


}
class AddPayment extends React.Component {

    render() {
        const member = this.props.member;
        return (

            <Popup closeOnEscape trigger={<button id="add_Payment"> Add Payment</button>} modal
                contentStyle={{ height: '400px', width: "400px", margin: "auto auto" }} closeOnDocumentClick>
                {close => (

                    <div className="add-payment">
                        <table>
                            <tbody>

                                <tr>
                                    <td>Name</td>
                                    <td><input type="text" value={member.name} disabled /></td>
                                </tr>
                                <tr>
                                    <td>Flat No</td>
                                    <td><input type="text" value={member.flatNo} disabled /></td>
                                </tr>
                                <tr>
                                    <td>Payment Balanced</td>
                                    <td><input type="text" value={member.paymentBalance} disabled /></td>
                                </tr>
                                <tr>
                                    <td>Amount</td>
                                    <td><input type="Number" onChange={(evt) => {
                                        this.setState({ amount: evt.target.value })
                                    }} /></td>
                                </tr>
                                <tr>
                                    <td>Re-enter Amount</td>
                                    <td><input type="Number" onChange={(evt) => {
                                        this.setState({ reamount: evt.target.value })
                                    }} /></td>
                                </tr>
                            </tbody>

                        </table>
                        <center><button onClick={() => {

                            this.pay(member, close);



                        }}>Pay</button></center>
                        <center>
                            <button onClick={() => {

                                close();

                            }}>cancel</button></center>



                    </div>)}
            </Popup>
        );
    }
    pay = (member, cb) => {
        if (this.state.amount !== this.state.reamount) {
            return alert("Please match both required field with same value");
        }
        var body = {
            amount: this.state.amount,
            title: "Mr" + member.name + " payment of Rs:" + this.state.amount,
            memberId: member._id
        }
        this.postPayment(body, cb);


    }
    postPayment = (body, cb) => {

        fetch(`${GloabalApi.budgetApi}budget/receive`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then((response) => {

            response.json().then((data) => {

                if (data.success) {
                    alert("paid");
                    this.props.fetchMembers();
                    cb();
                    this.setState({ amount: 0, reamount: 0 });


                }
                else {
                    alert(data.message);

                }
            });
        }).catch(() => {
            alert("Error sending data")

        }
        );
    }
}
export default Member;