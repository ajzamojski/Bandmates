// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// TO DO:
// 1. Setup how user's profile page looks.
// 2. Styling
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------

var React = require('react');

// Including the Link component from React Router to navigate within our application without full page reloads
var Link = require("react-router").Link;

var Profile = React.createClass ({
	getInitialState: function() {
        return {
            firstName: null,
            lastName: null,
            userName: null,
            email: null,
            picture: null,
            address: null,
        }
  	},

   componentDidMount() {

   	 $.get("/loggedin", function(data) {

  		if (data) {
  			console.log(data);
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

  getProfile: function () {

  },

	render: function () {
		return (
			<div className ="container">
				<div className="row">
					<div className="jumbotron">
						<h1>Profile</h1>
					</div>
				</div>
      <div className="container">
      	<div className="row">
      		<div className="col-sm-6">
	      		<figure className="snip1543"> <img src="https://avatars3.githubusercontent.com/u/23372535?v=3&s=400" alt="sample100" />
	      		</figure>
      		</div>
      		<div className="col-sm-3">
      		<span id="firstNameProfile">{this.state.firstName}</span>
      		<span id="lastNameProfile"> {this.state.lastName}</span> <br></br>
      		<span id="userNameProfile">{this.state.userName}</span> <br></br>
      		<span id="emailProfile">{this.state.email}</span> <br></br>
      		</div>
      	</div>
      </div>
			</div>
		)
	}
});

module.exports = Profile;