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
// var CSSTransitionGroup = require('react-transition-group/CSSTransitionGroup');
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
			user: {
				firstName: 'Kevin',
				lastName: 'Lee'
			},
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
					main: () => <Events something= {this.printData} />
				},
				{ path: '/user/search',
					sidebar: () => <div></div>,
					main: () => <Search />
				},
				{ path: '/user/messenger',
					sidebar: () => <div></div>,
					main: () => <Messenger />
				},
				{ path: '/user/profile',
					sidebar: () => <div></div>,
					main: () => <Profile />
				},
				{ path: '/user/settings',
					sidebar: () => <div></div>,
					main: () => <Settings />
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

  something: function() {
  	console.log("this is triggereed");
  },

	printData: function(a) {
		console.log("i made it" + a);
	},
	render: function() {
		return (
			<div>
			{/*Sidebar*/}
				<div>
					<nav className ="container col-xs-4" id="sidebar">
						<ul className="nav nav-list nav-stacked span2">
							<li className="nav-header text-center active btn-group">
								{/*{this.state.user.firstName + " " + this.state.user.lastName}*/}
								MENU
							</li>
							{/*<li className="nav-header text-center">MENU</li>*/}
							<li><NavLink to="/"><i className="fa fa-home" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;Home</NavLink></li>
							<li><NavLink exact to="/user" className="selected"><i className="fa fa-user" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;Main</NavLink></li>
							<li><NavLink to="/user/search" className="selected" activeStyle={{backgroundColor: '#FED136'}}><i className="fa fa-search" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;Search</NavLink></li>
							<li><NavLink to="/user/messenger" className="selected" activeStyle={{backgroundColor: '#FED136'}}><i className="fa fa-comments" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;Messenger</NavLink></li>
							<li><NavLink to="/user/events/" className="selected" activeStyle={{backgroundColor: '#FED136'}}><i className="fa fa-calendar-check-o" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;Events</NavLink></li>
							<li><NavLink to="/user/profile" className="selected" activeStyle={{backgroundColor: '#FED136'}}><i className="fa fa-list-alt" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;Profile</NavLink></li>
							<li><NavLink to="/user/settings" className="selected" activeStyle={{backgroundColor: '#FED136'}}><i className="fa fa-cog" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;Settings</NavLink></li>
<<<<<<< HEAD
<<<<<<< HEAD
							<li><NavLink exact to="/" className="selected" activeStyle={{backgroundColor: '#FED136'}}><i className="fa fa-sign-out" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;Logout</NavLink></li>
=======
							<li><NavLink to="/" onClick={this.something()} className="" ><i className="fa fa-cog"></i>&nbsp;&nbsp;&nbsp;Logout</NavLink></li>
>>>>>>> 1b08230b07b9434cdc4e19f935a638dac48be3e8
=======

							//<li><NavLink exact to="/" className="selected" activeStyle={{backgroundColor: '#FED136'}}><i className="fa fa-sign-out" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;Logout</NavLink></li>
							<li><NavLink to="/" onClick={this.something()} className="" ><i className="fa fa-cog"></i>&nbsp;&nbsp;&nbsp;Logout</NavLink></li>

>>>>>>> a6272ce5b234f14f5cc1a4c07a725cd9b5fc9b52
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

<<<<<<< HEAD
<<<<<<< HEAD
			<div id="content">
				
				{/*Top Navbar*/}
				{/*<nav className="navbar navbar-toggleable-md navbar-dark scrolling-navbar" id="userBar">
					<div className="container">
						<div className="navbar-toggleable-xs">*/}
							{/*<!--Navbar Brand-->*/}
							{/*<a className="navbar-brand">Home</a>*/}
							{/*<!--Links-->*/}
							{/*<ul className="nav navbar-nav" style={{float: 'right'}}>
								<li className="nav-item active btn-group">
									<a className="nav-link dropdown-toggle" id="dropdownMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Logged in as {this.state.user.firstName}</a>
									<div className="dropdown-menu" aria-labelledby="dropdownMenu">
										<NavLink to="/">Logout</NavLink>
									</div>
								</li>
							</ul>
						</div>
					</div>
            	</nav>*/}
				
=======
>>>>>>> 1b08230b07b9434cdc4e19f935a638dac48be3e8
=======
			<div id="content">
>>>>>>> a6272ce5b234f14f5cc1a4c07a725cd9b5fc9b52
				<div>
				<Route render={({location, history, match}) => {

					return (
						<div>
						{this.state.userRoutes.map((route, index) => (
							<RouteTransition 
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
									randomData = {this.getData}
								/>
								</Switch>
							</RouteTransition>
						))}
						</div>

					);

				}} />

			</div>

			</div>
		)
	}
});

module.exports = Main;
