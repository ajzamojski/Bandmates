const React = require('react');
import {Switch} from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom'
import { 
    BrowserRouter as Router, 
    Route, 
    Link 
} from "react-router-dom";

var Home = require("../components/Home.js");
var Main = require("../components/Main.js");

function requireAuth(nextState, replace) {
    var log = true;

  if (log) {
    replace({
      pathname: '/login'
    })
  }
}

//Export routes
module.exports = (
    // The high level component is the Router component
    <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/user" component={Main}/>
                <Route render={function () {
                    return <h1>404 Not Found</h1>;
                }} />
            </Switch>
            {/* If user selects User show the appropriate component */}
        {/* If user selects any other path... we get the Main Route */}
    </BrowserRouter>
);
