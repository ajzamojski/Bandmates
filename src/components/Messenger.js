// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// TO DO:
// 1. User-to-User Messaging with Socket.io
// 2. Save log of messages to mySQL

// PIE IN THE SKY:
// 1. Display messages where 'from:' messages on left side, while 'to:' messages on right side
// 2. Styling
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------

var React = require('react');

// Including the Link component from React Router to navigate within our application without full page reloads
var Link = require("react-router").Link;

var Messenger = React.createClass ({
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
						<h1>Messenger</h1>
					</div>
				</div>
			</div>
			)
	}
});

module.exports = Messenger;