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
    main: () => <div></div>
  },
	{ path: '/user',
  	sidebar: () => <div></div>,
    main: () => <div></div>
  },
  { path: '/user/events',
  	sidebar: () => <div></div>,
    main: () => <Events />
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

var Main = React.createClass ({
	getInitialState: function() {
        return {
            state: null
        }
  },
	render: function() {
		return (
			<div>
			{/*Sidebar*/}
				<div>
					<nav className ="container col-xs-4"id="sidebar">
						<ul className="nav nav-list nav-stacked span2">
							<li className="nav-header text-center">Menu</li>
							<li><NavLink to="/">Home</NavLink></li>
							<li><NavLink to="/user">Main</NavLink></li>
							<li><NavLink to="/user/search">Search</NavLink></li>
							<li><NavLink to="/user/messenger">Messenger</NavLink></li>
							<li><NavLink to="/user/events">Events</NavLink></li>
							<li><NavLink to="/user/profile">Profile</NavLink></li>
							<li><NavLink to="/user/settings">Settings</NavLink></li>
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

			<div id="content" style={{ flex: 2, padding: '10px'}}>
				{userRoutes.map((route, index) => (
					<Route
						key={index}
						path={route.path}
						exact={route.exact}
						component={route.main}
					/>
				))}
			</div>

			</div>
		)
	}
});

module.exports = Main;
