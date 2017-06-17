import React, { Component } from 'react';

// Including the Link component from React Router to navigate within our application without full page reloads
var Link = require("react-router").Link;

class Settings extends Component {

	render () {

		return (
			<div className ="container">
				<div className="row">
					<div className="jumbotron">
						<h1>Settings</h1>
						{/*<Link to="/"><button className="btn btn-default">Home</button></Link>*/}
						{/*<Link to="/chat"><button className="btn btn-default">Comments</button></Link>*/}
					</div>
				</div>
			</div>

			)
	}
}

export default Settings;