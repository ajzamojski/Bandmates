// Requiring our models
var db = require("../models");
var User = require('../models/user.js');
var path = require("path");
var passport = require('passport');

module.exports = function (app) {

	//user registered successfully
	app.get("/registered", function(req, res) {
		// console.log("in the /profile callback");
		const loginOn = req.isAuthenticated();
		console.log(loginOn);
		console.log(req.isAuthenticated());
		// res.render('/', { loginOn: loginOn });
		res.json({loginOn, registerSuccess: req.flash('signupMessage')});

	});

	//user registration failed
	app.get("/registeredfail", function(req, res) {

		res.json({registerError: req.flash('signupMessage')});

	});

	//user successfully logged in
	app.get("/loggedin", isLoggedIn, function(req, res) {
		// console.log("in the /profile callback");
		console.log(req.user);
		// console.log(req.user);
		console.log(req.isAuthenticated());
		var userAuthenticated = req.isAuthenticated();
		res.json({userData: req.user, userAuthenticated, loginMessage: req.flash('loginMessage')});
		// res.render('profile', { user: req.user, loginError: req.flash('loginError') });

	});

	//a login error occured
	app.get('/loginfail', function(req, res) {

		res.json({loginError: req.flash('loginMessage')});

	});

	//loggin out a user
	app.get("/logout", function(req, res) {

		req.logout();
		console.log(req.user);
		console.log(req.isAuthenticated());
		res.json({result: req.isAuthenticated});

	});

	//route for registering a user
	app.post("/users/register", passport.authenticate('local-signup', {
			successRedirect: '/registered',
			failureRedirect: '/registeredfail',
			failureFlash: true
		}));

	//route for login
	app.post("/users/login", passport.authenticate('local-login', {
			successRedirect: '/loggedin',
			failureRedirect: '/loginfail',
			failureFlash: true
	}));

	

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/loginfail');
}


}