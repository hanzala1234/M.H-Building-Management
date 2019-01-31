import React from 'react'
import './message.css'
import GlobalApi from '../../../config/api'
class Messages extends React.Component {

  
    constructor() {
        super();
        this.state = {
            messages: [],
            isLoading: true,
            err: null
          }
    }
    componentDidMount() {
        this.fetchMessages();
    }
    render() {
        return (
            <div>
              
                <div className='main-div'>
                    <div className='main-center-div'>

                        <div className="message-div">
                            <SubmitHeader fetchMessages={this.fetchMessages} />

                            {<DisplayMessages {...this.state} />}

                </div></div>
                </div>
            </div>
        );
    }
    fetchMessages = () => {
        
        fetch(`${GlobalApi.messageApi}messages/all`).then(
            (response) => {
                response.json().then((data) => {
                    if (data.success) {

                        this.setState({ messages: data.data, isLoading: false })
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

function DisplayMessages(props) {

    if (!props.isLoading && props.err == null) {
        return (
            <div>
            <center>   <h1>All Suggestion/Complain</h1> </center>
            <div>
                {props.messages.map((message) => {
                    return (
                        
                        <div className={message.messageType === 'suggestion' ? 'complain' : "suggestion"} 
                        key={message._id}
                        >
                            <h4>{message.name}</h4>
                            <span id="date">{new Date(message.createAt).toDateString()}</span>
                            <p> {message.message}</p>
                            <span id="type"> type: {message.messageType}</span>

                        </div>
                    )
                })}

            </div></div>
        );
    }
    else if (props.err) {
        return (<p>Error while fetching data</p>);
    }
    else if (props.isLoading) return (<p>Loading...</p>)
}
class SubmitHeader extends React.Component {
    constructor() {
        super();
        this.state = {
            composeType: "complain",
            composedMessage: ""
        }
    }

    render() {

        return (<div className='message-header'>
            <textarea cols={70} value={this.state.composedMessage} onChange={(evt) => {

                this.setState({ composedMessage: evt.target.value });
            }}></textarea>
            <ul>
                <li>
                    <select onChange={(evt) => {
                        this.setState({ composeType: evt.target.value });
                    }}>

                        <option>complain</option>
                        <option>suggestion</option>
                    </select>

                </li>
                <li><button onClick={this.submit}>Submit</button></li>
            </ul>
        </div>);
    }

    submit = () => {
        var { composeType, composedMessage } = this.state;
        var name = sessionStorage.getItem("user_name");
        var body = {
            messageType: composeType,
            message: composedMessage,
            name: name,
            memberId: sessionStorage.getItem("user_id")
        };
        this.postMessages(body);
    }
    postMessages = (body) => {
        
        fetch(`${GlobalApi.messageApi}messages/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then((response) => {
            response.json().then((data) => {
                if (data.success) {
                    alert("data successfully added");
                    this.props.fetchMessages();
                    this.setState({ composedMessage: "" })
                }
                else {
                    alert(data.message.message);
                    
                }
            });
        }).catch(() => alert("Error sending data"));
    }
}

export default Messages;