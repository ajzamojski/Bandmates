const React = require('react');
var router = require('react-router');
const Switch = require('react-router-dom').Switch;
import { BrowserRouter } from 'react-router-dom'
import { 
    BrowserRouter as Router, 
    Route, 
    Link 
} from "react-router-dom";

// Include the IndexRoute (catch-all route)
// const IndexRoute = require('react-router-dom').IndexRoute;

var Home = require("../components/Home.js");
var Main = require("../components/Main.js");

//Export routes
module.exports = (

    // The high level component is the Router component
    <BrowserRouter >
            <Switch>
                <Route path="/" component={Main}/>
                <Route path="/home" component={Home}/>
                {/*<IndexRoute component={Main} />*/}
            </Switch>
            {/* If user selects User show the appropriate component */}

        {/* If user selects any other path... we get the Main Route */}
        
    </BrowserRouter>
);
