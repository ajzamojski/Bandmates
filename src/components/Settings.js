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
const states = ["AK","AL","AR","AZ","CA","CO","CT","DE","FL","GA","HI","IA","ID","IL","IN","KS",
"KY","LA","MA","MD","ME","MI","MN","MO","MS","MT","NC","ND","NE","NH","NJ","NM",
"NV","NY","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VA","VT","WA","WI","WV","WY"];

var Settings = React.createClass ({
	getInitialState: function() {
        return {
			// firstName: {this.state.firstName},
			// lastName: 'Lee',
			// email: 'zapetou@gmail.com',
			// password: '*****',
			// passwordVer: '*****',
			// photo: '',
			// city: 'Edison',
			// stateLocation: 'NJ',
			// zip: '08854',
			// age: '25',
			// phone: '999-999-9999',
			// gender: 'Male',
			// instrument: 'Trumpet',
			// education: 'Rutgers U.',
			// exp: 'Played trumpet in high school.'
        };
  	},
	handleChange: function(event) {
		const name = event.target.name;
		const value = event.target.value;
		this.setState({[name] : value});
		
	},
	handleUpdate: function(event) {
		event.preventDefault();
		//save new state to mySQL DB

		// var firstName = req.body.firstName;
  //       var lastName = req.body.lastName;
		// var username = req.body.userName;
		// var email = req.body.email;
		// var password = generateHash(req.body.password);
		// var photoURL
		// var city
		// var state
		// var zipcode
		// var age
		// var phone
		// var gender
		// var instrument
		// var education
		// var experience
		// var lat
		// var long
		// console.log(req.body);

		// 	// var newUserMysql = new Object();
		// 	// newUserMysql.email    = email;
		// 	// newUserMysql.password = password;
		// 	// console.log(newUserMysql);

	 //    db.User.update({firstName: firstName, lastName: lastName, username: username, email: email, password: password, photoURL: photoURL, city: city})
		// 	.done(function(data) {
		// 			// if (err) {
		// 			// 	return done(err);
		// 			// }
		// 			// newUserMysql.id = data.insertId;

		// 		console.log("the final data");
		// 		console.log(data);
		// 		return done(null, data, req.flash('signupMessage', 'You are now registered'));
		// 	};

		// var a = this.refs.query.value;
		// var b = this.refs.city.value;
		// var c = this.refs.state.value;
		// var d = this.refs.startDate.value;
		// var e = this.refs.endDate.value;
		// var f = this.refs.radius.value;
		// var lat;
		// var lng;

		// var loc = b + ", " + c;

		var userRegData = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                userName: this.state.username,
                email: this.state.email,
                password: this.state.password,
                
            }

		 Helpers.logInUser(userData).then(function(result){

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
                document.getElementById("logInSuccess").style.display = "block";
                <Redirect to="/user"/>

		// <Redirect to="/user/profile"/>

	},
	componentDidMount: function() {
		console.log('Component Mounted - Settings');

		$.get("/loggedin", function(data) {

   	 	console.log(data);
   	 	console.log(data.notAuthenticated == true);
   	 	console.log(!(data.notAuthenticated == true));
  		if (!(data.notAuthenticated === true)) {

  			this.setState({
  				firstName: data.userData.firstName,
  				lastName: data.userData.lastName,
  				userName: data.userData.username,
  				email: data.userData.email,


  			})
  		}
  		console.log(this.state.firstName);
  	}.bind(this));

	},
	render: function() {
		return (
			<div className ="container">
				<div className="row">
					<div className="jumbotron">
						<h1>Settings</h1>
					</div>

					<div className="col-md-10 col-md-offset-1">
				<form id="editForm" onSubmit={this.handleUpdate}>
					<div className="form-group">
						<label htmlFor="firstName">First Name:</label>
						<input type="text" className="form-control" id="firstName" name="firstName" value={this.state.firstName} onChange={this.handleChange}/>
						<br />
						<label htmlFor="lastName">Last Name:</label>
						<input type="text" className="form-control" id="lastName" name="lastName" value={this.state.lastName} onChange={this.handleChange}/>
						<br />
						<label htmlFor="email">Email:</label>
						<input type="text" className="form-control" id="loginEmail" name="email" value={this.state.email} onChange={this.handleChange}/>
						<br />
						<label htmlFor="password">Password:</label>
						<input type="password" className="form-control" id="loginPassword" name="password" value={this.state.password} onChange={this.handleChange}/>
						<br />
						<label htmlFor="passwordVerify">Verify Password:</label>
						<input type="password" className="form-control" id="verify" name="passwordVer" value={this.state.passwordVer} onChange={this.handleChange}/>
						<br />
						<label htmlFor="photoURL">Photo URL:</label>
						<input type="text" className="form-control" id="photoURL" name="photo" value={this.state.photo} onChange={this.handleChange}/>
						<br />
						<label htmlFor="city">City:</label>
						<input type="text" className="form-control" id="city" name="city" value={this.state.city} onChange={this.handleChange}/>
						<br />
						<div className="form-group">
							<label htmlFor="state">State:</label>
							<select className="form-control" id="state" name="stateLocation" value={event.target.value} onChange={this.handleChange}>
								{
									states.map(function(el) {
										return <option key ={el}
												value={el}>{el}</option>
									})
								}
							</select>
						</div>
						<br />
						<label htmlFor="zipCode">Zip Code:</label>
						<input type="text" className="form-control" id="zipCode" name="zip" value={this.state.zip} onChange={this.handleChange}/>
						<br />
						<label htmlFor="age">Age:</label>
						<input type="text" className="form-control" id="age" name ="age" value={this.state.age} onChange={this.handleChange}/>
						<br />
						<label htmlFor="phone">Phone Number:</label>
						<input type="text" className="form-control" id="phone" name="phone" value={this.state.phone} onChange={this.handleChange}/>
						<br />
						<div className="form-group">
							<label htmlFor="gender">Gender:</label>
							<select className="form-control" id="gender" name="gender" value={this.state.gender} onChange={this.handleChange}>
								<option value="Male">Male</option>
								<option value="Female">Female</option>
  							</select>
						</div>
						<br />
						<label htmlFor="instrument">Instrument/Tool:</label>
						<input type="text" className="form-control" id="instrument" name="instrument" value={this.state.instrument} onChange={this.handleChange}/>
						<br />
						<label htmlFor="body">Education/School:</label>
						<textarea className="form-control" rows="10" id="education" name="education" value={this.state.education} onChange={this.handleChange}></textarea>
						<div className="form-group">
							<label htmlFor="experience">Experience:</label>
							<textarea className="form-control" rows="10" id="experience" name="exp" value={this.state.exp} onChange={this.handleChange}></textarea>
						</div>
						<br />
					
						<button type="submit" value="Submit" className="btn btn-success submit" id="btnUpdate">Save Changes</button>
					</div>
				</form>
			</div>
				</div>
			</div>

			)
	}
});

module.exports = Settings;