const React = require('react');
const router = require('react-router');
import {Switch} from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom'
import { 
    BrowserRouter as Router, 
    Route, 
    Link 
} from "react-router-dom";

var Home = require("../components/Home.js");
var Main = require("../components/Main.js");

//Export routes
module.exports = (

    // The high level component is the Router component
    <BrowserRouter>
            <Switch>

                <Route path="/" component={Main}/>
                <Route path="/home" component={Home}/>
                
                {/*<IndexRoute component={Main} />*/}

            </Switch>
            {/* If user selects User show the appropriate component */}

        {/* If user selects any other path... we get the Main Route */}
        
    </BrowserRouter>
);
