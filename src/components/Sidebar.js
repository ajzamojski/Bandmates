var React = require('react');
import { NavLink } from "react-router-dom";

var Sidebar = React.createClass ({
    render: function() {
        <div>
            
        <div>
            <nav className ="container col-xs-4"id="sidebar">
                <ul className="nav nav-list nav-stacked span2">
                    <li className="nav-header text-center">Menu</li>
                    <li><NavLink to="/home">Home</NavLink></li>
                    <li><NavLink to="/">Main</NavLink></li>
                    <li><NavLink to="/search">Search</NavLink></li>
                    <li><NavLink to="/messenger">Messenger</NavLink></li>
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
    }
});

module.exports = Sidebar;