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

<<<<<<< HEAD
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
>>>>>>> c6a40983e76e71c3fe645672a2679baebc849c53

//User Routes for sidebar navigation
// const userRoutes = [
//   { path: '/',
//   	exact: true,
//   	sidebar: () => <div></div>,
//     main: () => <div></div>
//   },
// 	{ path: '/user',
//   	sidebar: () => <div></div>,
//     main: () => <div></div>
//   },
//   { path: '/user/events',
//   	sidebar: () => <div></div>,
//     main: () => <Events something= {this.state.main} />
//   },
//   { path: '/user/search',
//   	sidebar: () => <div></div>,
//     main: () => <Search />
//   },
//   { path: '/user/messenger',
//   	sidebar: () => <div></div>,
//     main: () => <Messenger />
//   },
//   { path: '/user/profile',
//   	sidebar: () => <div></div>,
//     main: () => <Profile />
//   },
//   { path: '/user/settings',
//   	sidebar: () => <div></div>,
//     main: () => <Settings />
//   }
// ]

>>>>>>> master
var Main = React.createClass ({
	getInitialState: function() {
        return {

            main: "Main State",
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
	printData: function(a) {
		console.log("i made it" + a);
	},
	render: function() {
		return (
			<div>
			{/*Sidebar*/}
				<div>
					<nav className ="container col-xs-4"id="sidebar">
						<ul className="nav nav-list nav-stacked span2">
							<li className="nav-header text-center">MENU</li>
							<li><NavLink to="/">Home</NavLink></li>
							<li><NavLink to="/user">Main</NavLink></li>
							<li><NavLink to="/user/search">Search</NavLink></li>
							<li><NavLink to="/user/messenger">Messenger</NavLink></li>
							<li><NavLink to="/user/events/">Events</NavLink></li>
							<li><NavLink to="/user/profile">Profile</NavLink></li>
							<li><NavLink to="/user/settings">Settings</NavLink></li>
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

			<div id="content" style={{ flex: 2}}>
				<nav className="navbar navbar-toggleable-md navbar-dark scrolling-navbar" id="userBar">

                <div className="container">

                    <div className="navbar-toggleable-xs">
                        {/*<!--Navbar Brand-->*/}
                        <a className="navbar-brand">Home</a>
                        {/*<!--Links-->*/}
                        <ul className="nav navbar-nav" style={{float: 'right'}}>
                            
                            <li className="nav-item active btn-group">
                                <a className="nav-link dropdown-toggle" id="dropdownMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Logged In As *USER*</a>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenu">
                                    <NavLink to="/">Logout</NavLink>
                                </div>
                            </li>
                        </ul>
                    </div>

                </div>

            </nav>
				{this.state.userRoutes.map((route, index) => (
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
