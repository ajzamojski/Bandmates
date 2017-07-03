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
			user: undefined,
            usersContacts: [],
			messageHistory:[],
			messages:[]
        }
  	},
	componentDidMount: function() {
		
		this.setState({user: this.props.theUser});
		this.socket = io().connect();
		this.socket.on('message', function(message) {
			console.log(message);
			this.setState({messages: [message, ...this.state.messages] })
		}.bind(this))
		this.getContacts();
		//on initial load, user's connections should be shown under contacts
	},
	getContacts: function() {
		//grab user's id
		var userID = this.props.theUser.id;
		console.log(userID);
		//with id, query for user's connections/contacts under the friends table
		//grab each contact_id, and with that, grab each contact's name/username/profession+role and append to contacts list
	},
	handleSubmit: function(event) {
		event.preventDefault();
		const body = event.target.value
		if(event.keyCode === 13 && body) {
			const message = {
				body,
				from: 'Me'
			}
			this.socket.emit('message', body)
			event.target.value='';
		}
	},
	render: function() {
		const messages = this.state.messages.map((message,index) => {
			const img = message.img ? <img src={message.img} width='100px' /> : null
			return <li style={{listStyleType:'none'}} key={index}><b>{message.from}:</b>{message.body}</li>
		})
		const contacts = this.state.usersContacts.map((user, index) => {
			return (
				<div>
					<h4>{user.firstName + " " + user.lastName}</h4>
					<p></p>
				</div>
			)
		})
		return (
			<div className ="container contentWrapper">
				{/*BreadCrumb*/}
				<div className="row">
					<h2 style={{fontFamily: 'Roboto, Helvetica Neue, Helvetica, Arial, sans-serif', textTransform: 'none'}}> Main > Messenger</h2>
				</div>
				{/*Messenger Feature*/}
				<div className="row" style={{height: "800px"}}>
					<div id="messengerContent">

						{/*Contacts/Friends List*/}
						<div id="contactsList" style={{height: "550px", width:'40%'}}>
							<div className="item" style={{width: '100%',backgroundColor: '#37474F'}}>
							<h3 style={{paddingLeft: '1em', paddingBottom: '0.5em', fontFamily: 'Roboto, Helvetica Neue, Helvetica, Arial, sans-serif', textTransform: 'none', color: 'white'}}>Contacts</h3>
							</div>
							<div className="container item">
								{contacts}
							</div>
						</div>

						{/*Messaging*/}
						<div id="messageApp" style={{height: "550px", width:'50%'}}>
							<div className="item" style={{width: '100%',backgroundColor: '#37474F'}}>
								<h3 style={{paddingLeft: '1em', paddingBottom: '0.5em', fontFamily: 'Roboto, Helvetica Neue, Helvetica, Arial, sans-serif', textTransform: 'none', color: 'white'}}>Message</h3>
							</div>
							<div className="item" id="chatBox">
							<div id="messagesWrapper" style={{display: 'block'}}>
							{/*messages are shown here*/}
								{messages}
							</div>
							</div>
							<form className="item" onClick={this.handleSubmit}>
								<input style={{margin: '0 1em',padding: '0.75em'}} type='text' size="55" placeholder="Enter a message..." onKeyUp={this.handleSubmit}/>
								<button style={{color: 'white'}} id="sendBtn" className="btn btn-lg" onClick={this.handleSubmit}>Send</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		)
	}
});

module.exports = Messenger;