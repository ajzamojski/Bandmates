// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// TO DO:
// 1. Setup how user's profile page looks.
// 2. Styling
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------

var React = require('react');
var Helpers = require('./utils/helpers');

var Profile = React.createClass ({
	getInitialState: function() {
        return {
			contactBtn: false,
			user: undefined,
            firstName: undefined,
            lastName: undefined,
			username: undefined,
            city: undefined,
            state: undefined,
            zipcode: undefined,
            email: undefined,
			age: undefined,
			gender: undefined,
            profilePic: undefined,
			specifics: undefined,
            musicianInfo: "Alex Honeysett is a Brand and Marketing Strategist who partners with CEOs, executives and solopreneurs to grow their personal and professional brands, human-to-human. After spending nearly a decade working in PR and marketing for multimillion dollar brands and startups, Alex knows what truly drives conversions, sold-out launches and New York Times interviews—and it’s not mastering the marketing flavor of the week. It’s how well you connect with the heart-beating people you’re trying to help and communicate your understanding back to them. Alex has landed coverage in print and broadcast outlets around the world, including the Today Show, Wall Street Journal, Mashable, BBC, NPR and CNN. Her own articles have been featured in The Muse, Forbes, Inc., Mashable, DailyWorth and Newsweek. In addition to her extensive PR and marketing experience, Alex is a trained business coach Alex holds a BA in communications and journalism from the University of Delaware.",
            profession: "Backup Dancer",
            instrument: undefined,
            experience: "Alex has years of experience playing the trumpet and sounding awesome",
			id: undefined,
        }
  	},
	getUsernameInfo: function() {

		var res = window.location.href.split('/');
		var param = res[res.length-1]

		Helpers.getUserByUsername(res[res.length-1])
		.then(function(result) {
			console.log(result)
				
				//set profile state
				this.setState({
					firstName : result.data.firstName,
					lastName : result.data.lastName,
					username : result.data.username,
					city : result.data.city,
					state : result.data.state,
					zipcode : result.data.zipcode,
					email : result.data.email,
					age : result.data.age,
					profilePic : result.data.profilePic,
					gender : result.data.gender,
					instrument : result.data.instruments,
					specifics : result.data.styles,
					id: result.data.id
				})
				this.renderAddBtn(result.data.id, this.props.theUser.id);
		}.bind(this));
	},
	renderAddBtn: function(profileID, userID) {
		console.log(profileID + " " + userID);
		var contactCheck = false;

		Helpers.getContacts(userID)
		.then(function(result){
			console.log(result.data);
			console.log("profileID: " + profileID)
				//for loop : if profileID matches a contact ID, then return true
				for (var i = 0; i < result.data.length; i++) {
					console.log("contact_id: " + result.data[i].contact_id)
					if(result.data[i].contact_id == profileID) {
						contactCheck = true;
					} else {
						contactCheck = false;
					}
				}
			
			//if user's page OR if profile is already a contact , do not show button
			if (profileID == userID || contactCheck == true) {
				this.setState({contactBtn : false})
			} else {
				this.setState({contactBtn : true})
			}

		}.bind(this));

	},
	componentDidMount: function() {
		
		$.get("/loggedin", function(data) {

			console.log(data);
			console.log(data.notAuthenticated == true);
			console.log(!(data.notAuthenticated == true));
			if (!(data.notAuthenticated === true)) {
				
				this.setState({user: this.props.theUser});
				this.getUsernameInfo();

			}
		}.bind(this));
		console.log(this.state.user);
	},
	handleContactClick: function(event) {
		event.preventDefault();
		console.log(this.state.user)
		var userID = this.state.user.id;
		var contactID = this.state.id;

		Helpers.addContact(userID,contactID)
		.then(function(result) {
			console.log(result)
		})
	},
	getProfile: function () {

	},
	render: function () {
		return (
			<div>
				{/*BreadCrumb*/}
				<div className="row breadcrumb">
					<h2 style={{fontFamily: 'Roboto, Helvetica Neue, Helvetica, Arial, sans-serif', textTransform: 'none', fontWeight: '300'}}>Main > Profile</h2>
				</div>
				<div className="container contentWrapper">
					{/*Profile*/}
					<div className="row">
						<div id="banner" style={{display: 'block', height: '5em', marginBottom: '15px'}}>

							<h1 className="contentHeader" >{this.state.firstName + " " + this.state.lastName + "'s Profile"}</h1>

						</div>

						<div className="row" style={{display: 'flex', height:'40em'}}>
							<div className="panel" id="" style={{padding: '0px', display: 'block', height:'100%', margin: '0px 10px 15px 0px',width: '30%'}}>
								<div className="panel-heading">Profile</div>
								<div className="panel-body">
									<div> <img className="img-responsive" id="displayPic"src="/img/default_pic.jpg" /></div> <br></br>
									<div className="infoProfile">{this.state.firstName} {this.state.lastName}</div> 
									<div className="infoProfile">{this.state.city}, {this.state.state} {this.state.zipcode == undefined ? " " : this.state.zipcode}</div> 
									<div className="infoProfile">{this.state.email}</div>
									
									{this.state.contactBtn ? <button className="btn btn-lg" onClick={this.handleContactClick}>Add to Contacts</button> : ""}
								</div>
							</div>
						
							<div className="panel" style={{display: 'flex', padding: '0px', display: 'block', height:'100%', margin: '0px 0px 15px 10px',width: '70%'}}>
								<div className="panel-heading">About Me</div>
								<div className="panel-body" id="rightProfile">
									<b>Information: </b><br /><div id="profileInfo">{this.state.musicianInfo}</div> <br></br>
									<div className="rightProfileItem"><b>Age: </b>{this.state.age}</div><br></br>
									<div className="rightProfileItem"><b>Gender: </b>{this.state.gender}</div><br></br>
									<div className="rightProfileItem"><b>Profession: </b>{this.state.profession}</div> <br></br>
									<div className="rightProfileItem"><b>Instrument: </b>{this.state.instrument}</div> <br></br>
									<div className="rightProfileItem" style={{maxHeight: '80px'}}><b>Experience: </b>{this.state.experience}</div> <br></br>
								</div>
							</div>
						</div>
						<div className="row" style={{marginTop: '20px'}}>
							<div className="panel col-xs-12" id="" style={{padding: '0px', minHeight:'30em'}}>
								<div className="panel-heading">My Links</div>
								<div className="panel-body">

									<a href="https://www.youtube.com/channel/UC8HV_9oHzfB9kw76Yj69wqg" target="_blank" style={{float: "left", cursor: "pointer"}}><img src="../../img/youtubepic.png" width="120" height="100"/> </a>
									<a href="https://soundcloud.com" target="_blank" style={{float: "left", cursor: "pointer"}}><img src="../../img/soundcloud.jpg" width="120" height="100"/> </a>
									<div style={{clear: "left"}} ><iframe style={{marginTop: "18px"}}width="560" height="315" src="https://www.youtube.com/embed/1hnu7ckzKNg" 
										frameBorder="0" allowFullScreen></iframe>
									</div>

								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
});

module.exports = Profile;