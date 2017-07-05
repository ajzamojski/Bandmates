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
	getUsernameInfo() {

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
					zipcode : result.data.zip,
					email : result.data.email,
					age : result.data.age,
					profilePic : result.data.profilePic,
					gender : result.data.gender,
					instrument : result.data.instruments,
					specifics : result.data.styles,
					id: result.data.id
				})
				// this.renderAddBtn(result.data.id, this.props.theUser.id);
		}.bind(this));
	},
	// renderAddBtn: function(profileID, userID) {
	// 	console.log(profileID + " " + userID)
	// 	return (
	// 		<div>
	// 			{this.state.id == this.props.theUser.id ?
	// 				"" : <button className="btn btn-lg" onClick={this.handleContactClick}>Add as a Contact</button>}
	// 		</div>
	// 	);
	// },
	componentDidMount: function() {
		
		$.get("/loggedin", function(data) {

			console.log(data);
			console.log(data.notAuthenticated == true);
			console.log(!(data.notAuthenticated == true));
			if (!(data.notAuthenticated === true)) {
				
				this.setState({user: this.props.theUser});
				this.getUsernameInfo();
				// this.renderAddBtn();
				// this.setState({
				// 	firstName: data.userData.firstName,
				// 	lastName: data.userData.lastName,
				// 	userName: data.userData.username,
				// 	email: data.userData.email,
				// 	picture: data.userData.profilePic

				// })

			}
		}.bind(this));
		
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
				<div className="container contentWrapper">
					{/*BreadCrumb*/}
					<div className="row">
						<h2 style={{fontFamily: 'Roboto, Helvetica Neue, Helvetica, Arial, sans-serif', textTransform: 'none'}}>Main > Profile</h2>
					</div>
					{/*Profile*/}
					<div className="row">
						<div className="container" id="banner" style={{display: 'block', height: '8em'}}>
							<h1 style={{fontFamily: 'Roboto, sans-serif !important', textTransform: 'none'}} className="text-center">{this.state.firstName + " " + this.state.lastName + "'s Profile"}</h1>
						</div>

						<div className="row" style={{ height:'40em'}}>
							<div className="panel col-xs-3" id="" style={{padding: '0px', display: 'block', height:'100%', margin: '0px 10px 15px 0px'}}>
								<div className="panel-heading">Profile</div>
								<div className="panel-body">
									<div> <img className="img-responsive" id="displayPic"src="/img/default_pic.jpg" /></div> <br></br>
									<div className="infoProfile">{this.state.firstName} {this.state.lastName}</div> 
									<div className="infoProfile">{this.state.city}, {this.state.state} {this.state.zipcode == undefined ? " " : this.state.zipcode}</div> 
									<div className="infoProfile">{this.state.email}</div>
									{/*{this.state.id == this.props.theUser.id ?
									"" : */}
									<button className="btn btn-lg" onClick={this.handleContactClick}>Add as a Contact</button>
									{/*}*/}
									</div>
							</div>
						
							<div className="panel col-xs-7" id="" style={{padding: '0px', display: 'block', height:'100%', margin: '0px 10px 15px 0px'}}>
								<div className="panel-heading">About Me</div>
								<div className="panel-body">
									<div className="rightProfile" id="rightProfile"><em>Information: </em>{this.state.musicianInfo}</div> <br></br>
									<div className="rightProfile"><em>Age: </em>{this.state.age}</div> 
									<div className="rightProfile"><em>Gender: </em>{this.state.gender}</div><br></br>
									<div className="rightProfile"><em>Profession: </em>{this.state.profession}</div> <br></br>
									<div className="rightProfile"><em>Instrument: </em>{this.state.instrument}</div> <br></br>
									<div className="rightProfile"><em>Experience: </em>{this.state.experience}</div> <br></br>
								</div>
							</div>
						</div>
						<div className="row" >
							<div className="panel col-xs-12" id="" style={{padding: '0px', height:'30em'}}>
								<div className="panel-heading">My Links</div>
								<div className="panel-body">
									<iframe width="560" height="315" src="https://www.youtube.com/embed/1hnu7ckzKNg" 
									frameBorder="0" allowFullScreen></iframe>

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