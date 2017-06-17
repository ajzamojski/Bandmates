import React, { Component } from 'react';

class Sidebar extends Component {
    render() {
        <div>
            <nav id="sidebar">
                <ul class="nav nav-list nav-stacked span2">
                    <li class="nav-header text-center">Menu</li>
                    <li><a href="/">Home</a></li>
                    <li><a href="/finder">Finder</a></li>
                    <li><a href="/messenger">Messenger</a></li>
                    <li><a href="/events">Events</a></li>
                    <li><a href="/profile">Profile</a></li>
                    <li><a href="/settings">Settings</a></li>
                    <li><a class="nav-footer" href="/">Logout</a></li>
                </ul>
            </nav>
        </div>
    }
}

export default Sidebar;