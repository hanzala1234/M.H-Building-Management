import React from 'react';
import './member.css'
import NavBar from '../navBar/navBar';
import Popup from "reactjs-popup";


class Member extends React.Component {

    render() {
        return (
            <div class="member">
                <NavBar />
                <MembersDisplay />

            </div>
        );

    }
}
class MembersDisplay extends React.Component {
    constructor() {
        super();
        this.state = {
            members: [{
                name: "muzammil sikander",
                flatNo: "F-3",
                paymentBalance: "3000",
                image: "images/pic1.jpg"
            },
            {
                name: "Muhammad Hanzala",
                flatNo: "S-2",
                paymentBalance: "1000",
                image: "images/pic1.jpg"
            }
            ]
        }
    }
    render() {
        return (
            <div class="main-div">
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
                    {this.state.members.map((member) => {
                        return (

                            <tbody>
                                <tr>
                                    <td><img src="images/pic1.jpg" /></td>
                                    <td>{member.name}</td>
                                    <td>{member.flatNo}</td>
                                    <td>{member.paymentBalance}</td>

                                    <td><button id="payment_alert" >Payment Alert</button></td>
                                    {/* <td><button id="add_Payment" >Add Payment</button></td> */}
                                    <td><Popup  closeOnEscape trigger={<button id="add_Payment"> Add Payment</button>} modal
                                        contentStyle={{ height: '400px', width: "400px", margin: "auto auto" }} closeOnDocumentClick>
                                       { close=>( <div className="add-payment">
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
                                                        <td><input type="Number" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Re-enter Amount</td>
                                                        <td><input type="Number" /></td>
                                                    </tr>
                                                </tbody>

                                            </table>
                                            <center><button>Pay</button></center>
                                            <center>
                                                <button onClick={() => {
                                                
                                                close();

                                            }}>cancel</button></center>



                                       </div>)}
                                    </Popup></td>
                                </tr>



                            </tbody>


                        )
                    })}

                </table>
            </div>
        );
    }
}
export default Member;