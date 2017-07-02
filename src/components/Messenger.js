// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// TO DO:
// 1. User-to-User Messaging with Socket.io
// 2. Save log of messages to mySQL

// PIE IN THE SKY:
// 1. Display messages where 'from:' messages on left side, while 'to:' messages on right side
// 2. Styling
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------

var React = require('react');
const io = require('socket.io-client');

var Messenger = React.createClass ({
	getInitialState: function() {
        return {
            usersContacts: [],
			messageHistory:[],
			messages:[]
        }
  	},
	componentDidMount: function() {
		this.socket = io().connect();
		console.log("socket " + this.socket)
		this.socket.on('message', function(message) {
			console.log(message);
			this.setState({messages: [message, ...this.state.messages] })
		}.bind(this))
	},
	handleSubmit: function(event) {
		event.preventDefault();
		const body = event.target.value
		if(event.keyCode === 13 && body) {
			const message = {
				body,
				from: 'Me'
			}
			this.setState({ messages: [message, ...this.state.messages] })
			this.socket.emit('message', body)
			event.target.value='';
		}
		
	},
	render: function() {
		const messages = this.state.messages.map((message,index) => {
			const img = message.img ? <img src={message.img} width='100px' /> : null
			return <li key={index}><b>{message.from}:</b>{message.body}</li>
		})
		return (
			<div className ="container contentWrapper">
				<div className="row">
					<h2 style={{fontFamily: 'Roboto, Helvetica Neue, Helvetica, Arial, sans-serif', textTransform: 'none'}}> Main > Messenger</h2>
				</div>
				<div className="row" style={{height: "800px"}}>
					<div className="container-fluid">

						{/*Contacts/Friends List*/}
						<div className="container col-xs-4" style={{border:"solid black 1px", height: "550px", margin: "1em"}}>
							<h3>Friends</h3>
						</div>

						{/*Messaging*/}
						<div className="container col-xs-7" style={{border:"solid black 1px", height: "550px", margin: "1em"}}>
							<h3>Message</h3>
							<div id="chatBox">
								{messages}
							</div>
							<form onSubmit={this.handleSubmit}>
								<input type='text' placeholder="Enter a message..." onKeyUp={this.handleSubmit}/>
								<button className="btn btn-md" type="submit" onSubmit={this.handleSubmit}>Send</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		)
	}
});

module.exports = Messenger;