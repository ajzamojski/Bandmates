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
            state: null
        }
  	},
	render: function () {
		return (
			<div className ="container">
				<div className="row">
					<div className="jumbotron">
						<h1>Profile</h1>
					</div>
				</div>
			</div>
		)
	}
});

module.exports = Profile;