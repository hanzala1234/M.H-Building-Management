import React from 'react'
import '../Member/member.css'
import NavBar from '../navBar/navBar'

class Members extends React.Component {


    constructor() {
        super();
        this.state = {
            members: [],
            isLoading: true,
            err: null
        }
    }
    componentDidMount() {
        this.fetchMembers();
    }

    render() {

        return (
            <div>

                <NavBar />

                <div className="member-class">
                    <div className="main-member-class">

                        <center><h1>MEMBERS</h1></center>
                        {(this.state.isLoading) ? <center><p>Loading....</p></center> : <a></a>}
                        {(this.state.err) ? <center><p>Error fetching data</p></center> : <a></a>}
                        {this.state.members.map((data) => {
                            return (
                                <div className="member">
                                    <div className='key-value'>
                                        <h3>Name</h3>
                                        <h7>{data.name}</h7>
                                    </div>
                                    <div className='key-value'>
                                        <h3>Flat</h3>
                                        <h7>{data.flatNo}</h7>
                                    </div>
                                    <div className='key-value'>
                                        <h3>payment balanced</h3>
                                        <h7>{data.paymentBalance}</h7>
                                    </div>
                                    <img src={data.image} />
                                </div>)
                        })}
                    </div></div>
            </div>);
    }
    fetchMembers = () => {
        fetch('http://localhost:8080/member/all').then(
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
}
export default Members;