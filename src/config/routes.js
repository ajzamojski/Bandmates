const React = require('react');
const router = require('react-router');
import {Switch} from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom'
import { 
    BrowserRouter as Router, 
    Route,
    Redirect,
    Link 
} from "react-router-dom";

var Home = require("../components/Home.js");
var Main = require("../components/Main.js");
var retrievedItem = false;

function loggedIn(callback){

    $.ajax({
        url: "/loggedin",
        async: false,
        success: function(result) {
            console.log(result.userAuthenticated);
            if (result.userAuthenticated == 'undefined') {
                retrievedItem = false;
                return retrievedItem;
            }
             else {
            retrievedItem = result.userAuthenticated;
            // callback(retrievedItem);
            return retrievedItem;

            }

        }
    });
}

    // $.get("/loggedin").then(function(data) {

    //     // console.log(data);
    //     var isLogged = data.userAuthenticated;
    //     localStorage.setItem('isLogged', isLogged);
    //     // console.log(isLogged);
    //     // return isLogged;
    //     // callback(isLogged);
    // })
  // };
  // loggedIn(function(callback) { 
  //   return callback; }
  //   );
  // loggedIn();
retrievedItem = loggedIn();
// isLogged = loggedIn(function(callback) { 
//         console.log(isLogged);
//         return callback; 
//     });

function checkLoginStorage() {
    retrievedItem = localStorage.getItem('isLogged');
    if (retrievedItem === 'undefined') {
        retrievedItem = false;
    }
    console.log(retrievedItem);
    return retrievedItem;
}
loggedIn();
// checkLoginStorage();

// function nothingGood() {
//     var returningSomething = false;
//     return returningSomething;
// }

//Export routes
module.exports = (


    // The high level component is the Router component
    <BrowserRouter>
            <Switch>

                <Route exact path="/" component={Home}/>

                <Route path="/user" render={() => (
                    retrievedItem ? (
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
