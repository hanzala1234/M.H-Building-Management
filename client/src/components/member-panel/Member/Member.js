import React from 'react'
import '../Member/member.css'
import GloabalApi from '../../../config/api'

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
                
              

                <div className="member-class">
                    <div className="main-member-class">

                        <center><h1>MEMBERS</h1></center>
                        {(this.state.isLoading) ? <center><p>Loading....</p></center> : null}
                        {(this.state.err) ? <center><p>Error fetching data</p></center> : null}
                        {this.state.members.map((data) => {
                            return (
                                <div className="member" key={data._id}>
                                    <div className='key-value'>
                                        <h3>Name</h3>
                                        <span id='value'>{data.name}</span>
                                    </div>
                                    <div className='key-value'>
                                        <h3>Flat</h3>
                                        <span id='value'>{data.flatNo}</span>
                                    </div>
                                    <div className='key-value'>
                                        <h3>payment balanced</h3>
                                        <span id="value">{data.paymentBalance}</span>
                                    </div>
                                    <img src={data.image} alt={data.name} />
                                </div>)
                        })}
                    </div></div>
            </div>);
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
}
export default Members;