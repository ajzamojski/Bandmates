var React = require('react');
var Helpers = require('./utils/helpers');

var Profile = React.createClass ({
	getInitialState: function() {
        return {
			contactBtn: false,
			id: undefined,
			username: this.props.theUser.username,
			firstName: this.props.theUser.firstName,
			lastName: this.props.theUser.lastName,
			email: this.props.theUser.email,
			password: this.props.theUser.password,
			passwordVer: "*******",
			profilePic: this.props.theUser.profilePic,
			city: this.props.theUser.city,
			state: this.props.theUser.state,
			zipcode: this.props.theUser.zipcode,
			aboutyou: this.props.theUser.aboutyou,
			age: this.props.theUser.age,
			gender: this.props.theUser.gender,
			instruments: this.props.theUser.instruments,
			styles: this.props.theUser.styles,
			education: this.props.theUser.education,
			experience: this.props.theUser.experience,
			profession: this.props.theUser.profession,
			youtube: this.props.theUser.youtube,
			soundcloud: this.props.theUser.soundcloud,
			bandcamp: this.props.theUser.bandcamp,
			otherURL: this.props.theUser.otherURL,
			facebook: this.props.theUser.facebook,
			twitter: this.props.theUser.twitter,
			instagram: this.props.theUser.instagram

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
					instruments : result.data.instruments,
					profession : result.data.profession,
					styles : result.data.styles,
					id: result.data.id,
					experience: result.data.experience
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
					<div className="row" style={{padding: '4rem'}}>
						<div id="banner" style={{display: 'block', height: '5em', marginBottom: '15px'}}>
							<h1 style={{textTransform: 'none', fontFamily: 'Roboto, sans-serif', fontSize: '30px', fontWeight: '700'}}>{this.state.firstName + " " + this.state.lastName + "'s Profile"}</h1>
						</div>
						
						<div className="row" style={{display: 'flex', height:'40em'}}>
							<div className="panel" id="" style={{padding: '0px', display: 'block', height:'100%', margin: '0px 10px 15px 0px',width: '30%'}}>
								<div className="panel-heading">Profile</div>
								<div className="panel-body">
									<div> <img className="img-responsive" id="displayPic" src={this.state.profilePic} /></div> <br></br>
									<div className="infoProfile">{this.state.firstName} {this.state.lastName}</div> 
									<div className="infoProfile">{this.state.city}, {this.state.state} {this.state.zipcode == undefined ? " " : this.state.zipcode}</div> 
									<div className="infoProfile">{this.state.email}</div>
									{this.state.contactBtn ? <button style={{color: 'white',backgroundColor: '#FED136'}} className="btn btn-lg" onClick={this.handleContactClick}><i class="fa fa-plus" aria-hidden="true"></i>ADD TO CONTACTS</button> : ""}
								</div>
							</div>
						
							<div className="panel" style={{display: 'flex', overflowX: 'hidden', padding: '0px', display: 'block', height:'100%', margin: '0px 0px 15px 10px',width: '70%'}}>
								<div className="panel-heading">About Me</div>
								<div className="panel-body" id="rightProfile">
									<b>Information: </b><br /><div id="profileInfo">{this.state.aboutyou}</div> <br></br>
									<div className="rightProfileItem"><b>Age: </b>{this.state.age}</div><br></br>
									<div className="rightProfileItem"><b>Gender: </b>{this.state.gender}</div><br></br>
									<div className="rightProfileItem"><b>Profession: </b>{this.state.profession}</div> <br></br>
									<div className="rightProfileItem"><b>Instrument: </b>{this.state.instruments}</div> <br></br>
									<div className="rightProfileItem"><b>Playstyles: </b>{this.state.styles}</div> <br></br>
									<div className="rightProfileItem" ><b>Experience: </b>{this.state.experience}</div> <br></br>
								</div>
							</div>
						</div>

						<div className="row" style={{marginTop: '20px'}}>
							<div className="panel col-xs-12" id="" style={{padding: '0px', minHeight:'30em'}}>
								<div className="panel-heading">My Links</div>
								<div className="panel-body">


									<a href={this.state.youtube} target="_blank" style={{float: "left", cursor: "pointer"}}><img src="../../img/youtubepic.png" width="120" height="100"/> </a>
									<a href={this.state.soundcloud} target="_blank" style={{float: "left", cursor: "pointer"}}><img src="../../img/soundcloud.jpg" width="120" height="100"/> </a>
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