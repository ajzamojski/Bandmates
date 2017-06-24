// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// TO DO:
// 1. 404 Page/ Redirects / IndexRoute (routes.js)
// 2. Securely authenticate user here (Only if they are logged in can they see this component/page)
// 3. Make sure all components states are synced here via props
// 4. Styling/NavLink Transitions
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------

var React = require('react');

import { 
    BrowserRouter as Router, 
    Route, 
    Link 
} from "react-router-dom";
import {NavLink} from "react-router-dom";

//User Features 
var Home = require("./Home.js");
var Events = require("./Events.js");
var Search = require("./Search.js");
var Messenger = require("./Messenger.js");
var Profile = require("./Profile.js");
var Settings = require("./Settings.js");



//User Routes for sidebar navigation
const userRoutes = [
  { path: '/',
  	exact: true,
  	sidebar: () => <div></div>,
    main: () => <h1>Main</h1>
  },
	{ path: '/home',
  	sidebar: () => <div></div>,
    main: () => <Home />
  },
  { path: '/events',
  	sidebar: () => <div></div>,
    main: () => <Events />
  },
  { path: '/search',
  	sidebar: () => <div></div>,
    main: () => <Search />
  },
  { path: '/messenger',
  	sidebar: () => <div></div>,
    main: () => <Messenger />
  },
  { path: '/profile',
  	sidebar: () => <div></div>,
    main: () => <Profile />
  },
  { path: '/settings',
  	sidebar: () => <div></div>,
    main: () => <Settings />
  }
]

var Main = React.createClass ({
	getInitialState: function() {
        return {
            state: null,
            userData: {}
        }
  },

  
  getData: function(){
  		console.log('the state within Main is: ' + this.state);
  },

	render: function() {

		return (
			<div>
			{/*Sidebar*/}
				<div>
					<nav className ="container col-xs-4"id="sidebar">
						<ul className="nav nav-list nav-stacked span2">
							<li className="nav-header text-center">Menu</li>
							<li><NavLink to="/home">Home</NavLink></li>
							<li><NavLink to="/">Main</NavLink></li>
							<li><NavLink to="/search">Search</NavLink></li>
							<li><NavLink to="/messenger" randomData = {this.getData}> Messenger</NavLink></li>
							<li><NavLink to="/events">Events</NavLink></li>
							<li><NavLink to="/profile">Profile</NavLink></li>
							<li><NavLink to="/settings">Settings</NavLink></li>
							<li><NavLink className="nav-footer" to="/">Logout</NavLink></li>
						</ul>
					</nav>

					{userRoutes.map((route, index) => (
						<Route
							key={index}
							path={route.path}
							exact={route.exact}
							component={route.sidebar}

						/>
					))}
				</div>

				<div id="content" style={{ flex: 2, padding: '0px'}}>
					{userRoutes.map((route, index) => (
						<Route
							key={index}
							path={route.path}
							exact={route.exact}
							component={route.main}
							randomData = {this.getData}
						/>
					))}
				</div>

			</div>
		)
	}
});

module.exports = Main;
