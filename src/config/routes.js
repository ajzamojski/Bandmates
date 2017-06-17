var React = require('react');
var router = require('react-router');

// Include the Route component for displaying individual routes
var Route = router.Route;

// Include the Router component to contain all our Routes
// Here where we can pass in some configuration as props
var Router = router.Router;

// Include the hashHistory prop to handle routing client side without a server
// https://github.com/ReactTraining/react-router/blob/master/docs/guides/Histories.md#hashhistory
var hashHistory = router.hashHistory;

// Include the IndexRoute (catch-all route)
var IndexRoute = router.IndexRoute;

var Home = require("../components/Home.js");
// var Main = require("../components/Main.js");
// var Events = require("../components/Events.js");
// var Finder = require("../components/Finder.js");
// var Messenger = require("../components/Messenger.js");
// var Profile = require("../components/Profile.js");
// var Settings = require("../components/Settings.js");
// var Sidebar = require("../components/Sidebar.js");

//Export routes
module.exports = (

    // The high level component is the Router component
    <Router history={hashHistory}>
        <Route path="/" component={Home} >

            {/* If user selects User show the appropriate component */}
            {/*<Route path="/user" component={User} />*/}

            {/* If user selects any other path... we get the Main Route */}
            <IndexRoute component={Home} />
        </Route>
    </Router>
);
