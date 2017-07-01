var express = require('express');
var bodyParser = require("body-parser");
var logger = require("morgan");
var session = require("express-session");
var passport = require('passport');
var flash = require("connect-flash");
var LocalStrategy = require("passport-local").Strategy;

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

//Middleware for passport
app.use(session({ 
	secret: 'soup',
	saveUninitialized: false,
	resave: false
  // cookie: { secure: true }
 }));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static("./public"));

//Connect Flash
app.use(flash());

//--------------------------- ROUTES ---------------------------

//Import our routes for express to handle
require("./routing/routes.js")(app);
require("./config/passport.js");

//route for react HTML page
app.get('/', function(req,res) {
    res.sendFile(__dirname + "/public/index.html");
});

app.get('/user/?', function(req,res) {
    res.sendFile(__dirname + "/public/index.html");
});
app.get('/user/events', function(req,res) {
    res.sendFile(__dirname + "/public/index.html");
});
app.get('/user/profile', function(req,res) {
    res.sendFile(__dirname + "/public/index.html");
});
// app.post('/api/events', function(req,res) {
//   console.log('post:' + res);
//   res.json(res)
// })

// app.get('/api/events', function(req,res) {
//   console.log("get: " + res);
//   res.json(res)
// });

app.get('*', function(req,res) {
    res.sendFile(__dirname + "/public/index.html");
});

// Syncing our sequelize models and then starting our express app
db.sequelize.sync({}).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});