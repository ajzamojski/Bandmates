var React = require('react');
const io = require('socket.io-client');
var Helpers = require('./utils/helpers');

var Messenger = React.createClass ({
	getInitialState: function() {
        return {
			user: this.props.theUser.username,
            usersContacts: [],
			messageHistory:[],
			messages:[]
        }
  	},
	componentDidMount: function() {
		
		this.socket = io().connect();
		
		const nickname = this.props.theUser.username;
		console.log(this.props.theUser.username);

		this.socket.on('send-nickname', function(nickname) {
			this.socket.nickname = nickname;
            io.emit('send-nickname', {
                nickname,
            })
		})

		this.socket.on('message', function(message) {
			console.log(message);
			console.log(message.from);
			this.setState({messages: [message, ...this.state.messages] })

		}
		.bind(this))
		
		$.get("/loggedin", function(data) {

			console.log(data);
			console.log(data.notAuthenticated == true);
			console.log(!(data.notAuthenticated == true));
			if (!(data.notAuthenticated === true)) {
				
				this.setState({user: this.props.theUser});

				//get contact tables with contacts' IDs
				Helpers.getContacts(this.props.theUser.id)
				.then(function(result) {
					console.log(result.data);

					//for each contact ID, get userinfo
					for (var i = 0; i < result.data.length; i++) {
						Helpers.getUserById(result.data[i].contact_id) 
						.then(function(result) {
							for (var j = 0; j < result.data.length; j++) {
								var newState = result.data[j];
								//concat each user to component state
								this.setState({
									usersContacts: this.state.usersContacts.concat(newState)
								})
							}
							console.log(this.state.usersContacts)
						}.bind(this))
					}
				}.bind(this))
			}
		}.bind(this));
	},
	getContacts: function() {
		//grab user's id
		var userID = this.props.theUser.id;
		console.log(userID);

		//with id, query for user's connections/contacts under the friends table
		Helpers.getContacts(userID)
		.then(function(result) {
			console.log(result.data);
		})
		
		//grab each contact_id, and with that, grab each contact's name/username/profession+role and append to contacts list
	},
	handleSubmit: function(event) {
		event.preventDefault();
		
		const body = event.target.value
		if(event.keyCode === 13 && body) {
			console.log(this.props.theUser.username);
			var message = {
				body,
				from: this.props.theUser.username,
			}
			console.log('message1');
			const nickname = this.props.theUser.username;
			this.socket.emit('send-nickname', nickname);
			this.socket.emit('message', body)
			event.target.value='';
		}
	},
	render: function() {
		const messages = this.state.messages.map((message,index) => {
			const img = message.img ? <img src={message.img} width='100px' /> : null
			return <li style={{listStyleType:'none'}} key={index}><b>{message.from}:</b>{message.body}</li>
		})
		//on initial load, user's connections should be shown under contacts
		const contacts = this.state.usersContacts.map((user, index) => {
			return (
				<div key={index} onClick={this.messageThisContact} className="contactItem" >
						<img className="imgResponsive" style={{maxHeight:'50px' , float:'left', borderRadius: '25px', padding: '3px'}}src={user.profilePic}/>
						<h4 style={{fontFamily: 'Roboto, sans-serif', textTransform: 'none'}}>{user.firstName + " " + user.lastName}</h4>
						<p style={{fontWeight: '300'}}><i>{user.username}</i></p>
				</div>
			)
		})
		return (
			<div>
			{/*BreadCrumb*/}
			<div className="row breadcrumb">
				<h2 style={{fontFamily: 'Roboto, Helvetica Neue, Helvetica, Arial, sans-serif', textTransform: 'none', fontWeight: '300'}}> Main > Messenger</h2>
			</div>
			<div className ="container contentWrapper">
				
				{/*Messenger Feature*/}
				<div className="row" style={{height: "800px"}}>
					<div id="messengerContent">

						<div className="contentBanner" style={{width: '100%'}}>
							<h1 style={{fontFamily: 'Roboto, Helvetica Neue, Helvetica, Arial, sans-serif', textTransform: 'none'}}>Messenger</h1>
							<p>Find your list of contacts and socialize here!</p>
						</div>

						{/*Contacts/Friends List*/}
						<div id="contactsList" style={{height: "550px", width:'40%'}}>
							<div className="item" style={{width: '100%',backgroundColor: '#37474F'}}>
							<h3 style={{paddingLeft: '1em', paddingBottom: '0.5em', fontWeight: '300', fontFamily: 'Quicksand, Helvetica Neue, Helvetica, Arial, sans-serif', textTransform: 'none', color: 'white'}}>Contacts</h3>
							</div>
							<div className="container item">
								{contacts}
							</div>
						</div>

						{/*Messaging*/}
						<div id="messageApp" style={{height: "550px", width:'50%'}}>
							<div className="item" style={{width: '100%',backgroundColor: '#37474F'}}>
								<h3 style={{paddingLeft: '1em', paddingBottom: '0.5em', fontWeight: '300', fontFamily: 'Quicksand, Helvetica Neue, Helvetica, Arial, sans-serif', textTransform: 'none', color: 'white'}}>Chat</h3>
							</div>
							<div className="item" id="chatBox">
							<div id="messagesWrapper" style={{display: 'block'}}>
							{/*messages are shown here*/}
								{messages}
							</div>
							</div>
							<form className="item" style={{width: '100%'}} onClick={this.handleSubmit}>
								<input style={{margin: '0 1em',padding: '0.75em', width: '70%'}} type='text' placeholder="Enter a message..." onKeyUp={this.handleSubmit}/>
								<button style={{color: 'white', width: '20%'}} id="sendBtn" className="btn btn-lg" onClick={this.handleSubmit}>Send</button>
							</form>
						</div>
					</div>
				</div>
			</div>
			</div>
		)
	}
});

module.exports = Messenger;