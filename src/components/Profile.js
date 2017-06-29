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
            city: "Edison",
            state: "NJ",
            zipcode: "08854",
            userName: null,
            email: null,
            picture: null,
            musicianInfo: "Alex Honeysett is a Brand and Marketing Strategist who partners with CEOs, executives and solopreneurs to grow their personal and professional brands, human-to-human. After spending nearly a decade working in PR and marketing for multimillion dollar brands and startups, Alex knows what truly drives conversions, sold-out launches and New York Times interviews—and it’s not mastering the marketing flavor of the week. It’s how well you connect with the heart-beating people you’re trying to help and communicate your understanding back to them. Alex has landed coverage in print and broadcast outlets around the world, including the Today Show, Wall Street Journal, Mashable, BBC, NPR and CNN. Her own articles have been featured in The Muse, Forbes, Inc., Mashable, DailyWorth and Newsweek. In addition to her extensive PR and marketing experience, Alex is a trained business coach Alex holds a BA in communications and journalism from the University of Delaware.",
            profession: "Backup Dancer",
            instrument: "Trumpet Player",
            experience: "Alex has years of experience playing the trumpet and sounding awesome"
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
  				picture: data.userData.profilePic

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
								<div> <img className="img-responsive" id="displayPic"src="/img/default_pic.jpg" /></div> <br></br>
								<div className="infoProfile">{this.state.firstName} {this.state.lastName}</div> 
								<div className="infoProfile">{this.state.city} {this.state.state} {this.state.zipcode}</div> 
								<div className="infoProfile">{this.state.email}</div> 
							</div>
						
							<div className="container col-xs-8" id="" style={{display: 'block', height:'100%', border: 'solid 1px black'}}>
								<h3 className="text-center">Right Side</h3>
								<div className="rightProfile"><strong>Information: </strong>{this.state.musicianInfo}</div> <br></br>
								<div className="rightProfile"><strong>Profession: </strong>{this.state.profession}</div> <br></br>
								<div className="rightProfile"><strong>Instrument: </strong>{this.state.instrument}</div> <br></br>
								<div className="rightProfile"><strong>Experience: </strong>{this.state.experience}</div> <br></br>

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