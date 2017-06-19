// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// TO DO:
// 1. Integrate Eventbrite API
// 2. Search for events by type of events
// 3. Styling

// PIE IN THE SKY:
// 1. Be able to create user's own events
// 2. Show users that are going
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------

var React = require('react');
// Including the Link component from React Router to navigate within our application without full page reloads
var Link = require("react-router").Link;

var Events = React.createClass({
	getInitialState: function() {
        return {
            state: null
        }
  	},
	render: function() {
		return (
			<div className ="container">
				<div className="row">
					<div className="jumbotron">
						<h1>Events JS</h1>
					</div>
				</div>
			</div>

			)
	}
});

module.exports = Events;