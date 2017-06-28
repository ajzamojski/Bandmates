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

  getProfile: function () {

  },
	render: function () {
		return (

			<div >
				<div className="container">
					<div className="container">

						<div className="container" id="banner" style={{display: 'block', height: '8em'}}>
							<h1 className="text-center">{this.state.firstName + " " + this.state.lastName + "'s Profile"}</h1>
						</div>

						<div className="row" style={{ height:'40em', border: 'solid 1px black'}}>
							<div className="container col-xs-4" id="" style={{display: 'block', height:'100%', border: 'solid 1px black'}}>
								<h3 className="text-center">Left Side</h3>
							</div>
						
							<div className="container col-xs-8" id="" style={{display: 'block', height:'100%', border: 'solid 1px black'}}>
								<h3 className="text-center">Right Side</h3>
							</div>
						</div>
						<div className="row" >
							<div className="container col-xs-12" id="" style={{height:'25em', border: 'solid 1px black'}}>
								<h3 className="text-center">Bottom</h3>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
});

module.exports = Profile;