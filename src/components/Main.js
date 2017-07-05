// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// TO DO:
// 1. 404 Page/ Redirects / IndexRoute (routes.js)
// 2. Securely authenticate user here (Only if they are logged in can they see this component/page)
// 3. Make sure all components states are synced here via props
// 4. Styling/NavLink Transitions
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------

const React = require('react');

import { 
    BrowserRouter as Router, 
    Route, 
    Link 
} from "react-router-dom";
import {NavLink} from "react-router-dom";
import { RouteTransition } from 'react-router-transition';
import {Switch} from 'react-router-dom';

//User Features 
var Home = require("./Home.js");
var Events = require("./Events.js");
var Search = require("./Search.js");
var Messenger = require("./Messenger.js");
var Profile = require("./Profile.js");
var Settings = require("./Settings.js");

var Main = React.createClass ({
	getInitialState: function() {
        return {
            main: "Main State",
			user: undefined,
			userRoutes : [
				{ path: '/',
					exact: true,
					sidebar: () => <div></div>,
					main: () => <div></div>
				},
				{ path: '/user',
					sidebar: () => <div></div>,
					main: () => <div></div>
				},
				{ path: '/user/events',
					sidebar: () => <div></div>,
					// Syntax to reference props *******************************************
					main: () => <Events theUser={this.state.user} />
				},
				{ path: '/user/search',
					sidebar: () => <div></div>,
					main: () => <Search theUser={this.state.user}/>
				},
				{ path: '/user/messenger',
					sidebar: () => <div></div>,
					main: () => <Messenger theUser={this.state.user}/>
				},
				{ path: '/user/profile/:username',
					sidebar: () => <div></div>,
					main: () => <Profile theUser={this.state.user}/>
				},
				{ path: '/user/settings',
					sidebar: () => <div></div>,
					main: () => <Settings theUser={this.state.user}/>
				}
			]
        }
	},
	logout: function() {

		console.log("test worked");
		$.get('/logout', function(data) {
			console.log(data);
			console.log('successfully logged out')
		});

	},
	componentDidMount: function() {
		console.log(this.props.dbUserObject.userData);
		this.setState({user: this.props.dbUserObject.userData})
	},
	something: function() {
		console.log('triggered');
	},
	printData: function(a) {
		console.log("i made it" + a);
	},
	render: function() {
		return (
			<div>
				<nav id="appNav" className="navbar navbar-default navbar-custom navbar-fixed-top" style={{backgroundColor: 'black', height: '55px', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 3px 8px 0 rgba(0, 0, 0, 0.19)'}}>
					<div style={{width: '200px', display: 'block', padding: '0px', marginRight: '0px', color: '#fec503',fontSize: '5em', position: 'relative', left: '41px', bottom: '38px', fontFamily: '"Painting in the Sunlight", "Helvetica Neue", Helvetica, Arial, cursive'}}>Bandmates</div>
				</nav>
				{/*Sidebar*/}
				<div>
					<nav className ="container col-xs-4" id="sidebar">
						<ul className="nav nav-list nav-stacked span2">
							<li style={{height: '100px'}}></li>
								{/*<li className="nav-header text-center active btn-group">MENU</li>*/}
								{/*{this.state.user.firstName + " " + this.state.user.lastName}*/}
								{/*<li className="nav-header text-center">MENU</li>*/}
							<li style={{fontSize: '17px', color: '#5F5F5F'}}>&nbsp;&nbsp;&nbsp;<i className="fa fa-tachometer" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;Dashboard</li>
							<li><NavLink to="/">&nbsp;&nbsp;&nbsp;<i className="fa fa-home" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;Home</NavLink></li>
							<li><NavLink exact to="/user" className="selected">&nbsp;&nbsp;&nbsp;<i className="fa fa-user" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;Main</NavLink></li>
							<li><NavLink to="/user/search" className="selected" activeStyle={{backgroundColor: '#FED136'}}>&nbsp;&nbsp;&nbsp;<i className="fa fa-search" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;Search</NavLink></li>
							<li><NavLink to="/user/messenger" className="selected" activeStyle={{backgroundColor: '#FED136'}}>&nbsp;&nbsp;&nbsp;<i className="fa fa-comments" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;Messenger</NavLink></li>
							<li><NavLink to="/user/events/" className="selected" activeStyle={{backgroundColor: '#FED136'}}>&nbsp;&nbsp;&nbsp;<i className="fa fa-calendar-check-o" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;Events</NavLink></li>
							<li><NavLink to={{pathname: "/user/profile/" + this.props.dbUserObject.userData.username, state: {username: this.props.dbUserObject.userData.username}}} className="selected" activeStyle={{backgroundColor: '#FED136'}}>&nbsp;&nbsp;&nbsp;<i className="fa fa-list-alt" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;Profile</NavLink></li>
							<li><NavLink to="/user/settings" className="selected" activeStyle={{backgroundColor: '#FED136'}}>&nbsp;&nbsp;&nbsp;<i className="fa fa-cog" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;Settings</NavLink></li>

							{/*<li><NavLink exact to="/" className="selected" activeStyle={{backgroundColor: '#FED136'}}><i className="fa fa-sign-out" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;Logout</NavLink></li>*/}
							<li onClick={this.something}><NavLink exact to="/" className="selected" activeStyle={{backgroundColor: '#FED136'}} >&nbsp;&nbsp;&nbsp;<i className="fa fa-sign-out"></i>&nbsp;&nbsp;&nbsp;Logout</NavLink></li>

						</ul>
					</nav>
					{this.state.userRoutes.map((route, index) => (
						<Route
							key={index}
							path={route.path}
							exact={route.exact}
							component={route.sidebar}
						/>
					))}		
				</div>

				{/*Content*/}
				<div id="content">
				<div>
				<Route render={({location, history, match}) => {

					return (
						<div>
						{this.state.userRoutes.map((route, index) => (
							<RouteTransition 
							key={index}
							pathname={location.pathname}
							atEnter={{ opacity: 0 }}
							atLeave={{ opacity: 0 }}
							atActive={{ opacity: 1 }}
							className="transition-wrapper"
							runOnMount={true}>
								<Switch key={location.key} location={location}>
								<Route
									key={index}
									path={route.path}
									exact={route.exact}
									component={route.main}
								/>
								</Switch>
							</RouteTransition>
						))}
						</div>
					);
				}} />
				</div>
				</div>
			</div>
		)
	}
});

module.exports = Main;
