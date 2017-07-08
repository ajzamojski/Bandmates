// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// TO DO:
// 1. Retrieve user info from DB
// 2. Put in handleSave function for saving to DB
// 3. Resize and save user's photo to DB/cloud?
// 4. Styling
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------

var React = require('react');
var Helpers = require('./utils/helpers');



const states = ["AK","AL","AR","AZ","CA","CO","CT","DE","FL","GA","HI","IA","ID","IL","IN","KS",
"KY","LA","MA","MD","ME","MI","MN","MO","MS","MT","NC","ND","NE","NH","NJ","NM",
"NV","NY","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VA","VT","WA","WI","WV","WY"];

var Settings = React.createClass ({

	componentDidMount: function() {
		console.log('Component Mounted - Settings');
		this.setState({user: this.props.theUser});
		console.log(this.props.theUser);
	},

	getInitialState: function() {
        return {
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

        };
  	},

  		

	handleChange: function(event) {
		const name = event.target.name;
		const value = event.target.value;
		this.setState({[name] : value});
	},

	handleUpdate: function(event) {
		event.preventDefault();

		var oguser = this.state.email;

		var userData = {
				username: this.state.username,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,
                profilePic: this.state.profilePic,
                city: this.state.city,
                state: this.state.state,
                zipcode: this.state.zipcode,
                age: this.state.age,
                gender: this.state.gender,
                education: this.state.education,
                experience: this.state.experience,
				aboutyou: this.state.aboutyou,
				instruments: this.state.instruments,
				styles: this.state.styles,
				profession: this.state.profession,
				youtube: this.state.youtube,
				soundcloud: this.state.soundcloud,
				bandcamp: this.state.bandcamp,
				otherURL: this.state.otherURL,
				facebook: this.state.facebook,
				twitter: this.state.twitter,
				instagram: this.state.instagram         
        };
        console.log("the user:" + this.state.username);

        var query = this.state.username;

		Helpers.updateUser(oguser,userData)

			.then(function(result){

                if (result.data.loginError) {
                    if (result.data.loginError[0] === 'User not found') {
                        document.getElementById("logInUserNotFound").style.display = "block";
                    }

                    if (result.data.loginError[0] === 'Password is incorrect') {
                        document.getElementById("logInPassIncorrect").style.display = "block";
                    }  
                }
                else {
                
                console.log(result);
                <Redirect to="/user/profile"/>
               }
             }); 
	},


	componentWillReceiveProps: function(){
		console.log('Component Updating - Settings');

	},

	render: function() {
		return (
			<div>
				{/*BreadCrumb*/}
				<div className="row breadcrumb">
					<h2 style={{fontFamily: 'Roboto, Helvetica Neue, Helvetica, Arial, sans-serif', textTransform: 'none', fontWeight: '300'}}>Main > Settings</h2>
				</div>
				<div className ="container contentWrapper">
				
				<div className="contentBanner">
                    <h1 style={{fontFamily: 'Roboto, Helvetica Neue, Helvetica, Arial, sans-serif', textTransform: 'none'}}>Settings</h1>
                    <p>Update your info here</p>
                </div>

				{/*Settings*/}
				<div className="row" id="settingsDiv">
					{/*<h1 className="contentHeader" style={{margin: '30px 0px 25px 60px'}}>Settings</h1>*/}
				<div className="col-md-10 col-md-offset-1">

				<form id="editForm" onSubmit={this.handleUpdate}>
					<div className="form-group">
						<label htmlFor="firstName">Username:</label>
						<input type="text" className="form-control" id="username" name="username" value={this.state.username} onChange={this.handleChange}/>
						<br />
						<label htmlFor="firstName">First Name:</label>
						<input type="text" className="form-control" id="firstName" name="firstName" value={this.state.firstName} onChange={this.handleChange}/>
						<br />
						<label htmlFor="lastName">Last Name:</label>
						<input type="text" className="form-control" id="lastName" name="lastName" value={this.state.lastName} onChange={this.handleChange}/>
						<br />
						<label htmlFor="email">Email:</label>
						<input type="text" className="form-control" id="loginEmail" name="email" value={this.state.email} onChange={this.handleChange}/>
						<br />
						<label htmlFor="profilePic">Photo URL:</label>
						<input type="text" className="form-control" id="profilePic" name="profilePic" value={this.state.profilePic} onChange={this.handleChange}/>
						<br />
						<label htmlFor="city">City:</label>
						<input type="text" className="form-control" id="city" name="city" value={this.state.city} onChange={this.handleChange}/>
						<br />
						<div className="form-group">
							<label htmlFor="state">State:</label>
							<select className="form-control" id="state" name="state" value={this.state.state} onChange={this.handleChange}>
								{
									states.map(function(el) {
										return <option key ={el}
												value={el}>{el}</option>
									})
								}
							</select>
						</div>
						<br />
						<label htmlFor="zipcode">Zip Code:</label>
						<input type="text" className="form-control" id="zipcode" name="zipcode" value={this.state.zipcode} onChange={this.handleChange}/>
						<br />
						<label htmlFor="age">Age:</label>
						<input type="text" className="form-control" id="age" name ="age" value={this.state.age} onChange={this.handleChange}/>
						<br />
						<label htmlFor="aboutyou">About You:</label>
						<input type="text" className="form-control" id="aboutyou" name="aboutyou" value={this.state.aboutyou} onChange={this.handleChange}/>
						<br />
						<div className="form-group">
							<label htmlFor="gender">Gender:</label>
							<select className="form-control" id="gender" name="gender" value={this.state.gender} onChange={this.handleChange}>
								<option value="Male">Male</option>
								<option value="Female">Female</option>
  							</select>
						</div>
						<br />
						<label htmlFor="instruments">Instrument/Tool:</label>
						<input type="text" className="form-control" id="instruments" name="instruments" value={this.state.instruments} onChange={this.handleChange}/>
						<br />
						<label htmlFor="styles">Playstyle:</label>
						<input type="text" className="form-control" id="styles" name="styles" value={this.state.styles} onChange={this.handleChange}/>
						<br />
						<label htmlFor="body">Education/School:</label>
						<textarea className="form-control" rows="10" id="education" name="education" value={this.state.education} onChange={this.handleChange}></textarea>
						<div className="form-group">
						<label htmlFor="profession">Profession:</label>
						<input type="text" className="form-control" id="profession" name="profession" value={this.state.profession} onChange={this.handleChange}/>
						<br />
							<label htmlFor="experience">Experience:</label>
							<textarea className="form-control" rows="10" id="experience" name="experience" value={this.state.experience} onChange={this.handleChange}></textarea>
						</div>
						<br />
						<label htmlFor="youtube">Youtube:</label>
						<input type="text" className="form-control" id="youtube" name="youtube" value={this.state.youtube} onChange={this.handleChange}/>
						<br />
						<label htmlFor="soundcloud">SoundCloud:</label>
						<input type="text" className="form-control" id="soundcloud" name="soundcloud" value={this.state.soundcloud} onChange={this.handleChange}/>
						<br />
						<label htmlFor="bandcamp">Bandcamp:</label>
						<input type="text" className="form-control" id="bandcamp" name="bandcamp" value={this.state.bandcamp} onChange={this.handleChange}/>
						<br />
						<label htmlFor="otherURL">Other:</label>
						<input type="text" className="form-control" id="otherURL" name="otherURL" value={this.state.otherURL} onChange={this.handleChange}/>
						<br />
						<label htmlFor="facebook">Facebook:</label>
						<input type="text" className="form-control" id="facebook" name="facebook" value={this.state.facebook} onChange={this.handleChange}/>
						<br />
						<label htmlFor="twitter">Twitter:</label>
						<input type="text" className="form-control" id="twitter" name="twitter" value={this.state.twitter} onChange={this.handleChange}/>
						<br />
						<label htmlFor="instagram">Instagram:</label>
						<input type="text" className="form-control" id="instagram" name="instagram" value={this.state.instagram} onChange={this.handleChange}/>
						<br />
					
						<button type="submit" value="Submit" className="btn btn-success submit" id="btnUpdate">Save Changes</button>
					</div>
				</form>
				</div>
			</div>
				</div>
			</div>
			)
		
	}
});

module.exports = Settings;