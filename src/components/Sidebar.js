var React = require('react');
import { NavLink } from "react-router-dom";

var Sidebar = React.createClass ({
    render: function() {
        <div>
            <nav id="sidebar">
                <ul class="nav nav-list nav-stacked span2">
                    <li class="nav-header text-center">Menu</li>
                    <li><NavLink href="/">Home</NavLink></li>
                    <li><NavLink href="/finder">Finder</NavLink></li>
                    <li><NavLink href="/messenger">Messenger</NavLink></li>
                    <li><NavLink href="/events">Events</NavLink></li>
                    <li><NavLink href="/profile">Profile</NavLink></li>
                    <li><NavLink href="/settings">Settings</NavLink></li>
                    <li><NavLink class="nav-footer" href="/">Logout</NavLink></li>
                </ul>
            </nav>
        </div>
    }
});

module.exports = Sidebar;