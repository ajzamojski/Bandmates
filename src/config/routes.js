const React = require('react');
import {Switch} from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom'
import { 
    BrowserRouter as Router, 
    Route,
    Redirect,
    Link 
} from "react-router-dom";
import { RouteTransition } from 'react-router-transition';

var Home = require("../components/Home.js");
var Main = require("../components/Main.js");
var isLogged = false;

//function to check if user is logged in
function loggedIn(callback){

    $.ajax({
        url: "/loggedin",
        async: false,
        success: function(result) {
            console.log(result.userAuthenticated);
            if (result.userAuthenticated == 'undefined') {
                isLogged = false;
                return isLogged;
            }
             else {
            isLogged = result.userAuthenticated;
            // callback(isLogged);
            return isLogged;

            }

        }
    });
};

//assigning vavriable for router to handle a true variable
isLogged = loggedIn();

loggedIn();

//Export routes
module.exports = (

    // The high level component is the Router component
    <BrowserRouter>
            <Switch>

                <Route exact path="/" component={Home}/>

                <Route path="/user" render={() => (
                    isLogged ? (
                    <Main/>
                    
                  ) : (
                  
                    <Redirect to="/"/>
                  )
                )}/>

                <Route render={function () {
                    return <h1>404 Not Found</h1>;
                }} />
            </Switch>
            {/* If user selects User show the appropriate component */}
        {/* If user selects any other path... we get the Main Route */}
    </BrowserRouter>
);
