var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bCrypt = require("bcrypt-nodejs");

//mysql link
var db = require("../models");

passport.serializeUser(function(user, done){
	done(null, user.id);
});

// deserialize user 
passport.deserializeUser(function(id, done) {
 
    db.User.findById(id).then(function(user) {
 				// console.log(user);
        if (user) {
 
            done(null, user);
 
        } else {
 
            done(user.errors, null);
        }
    });
});

//local-sign-up
passport.use('local-signup', new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: true
}, function(req, email, password, done) {
		console.log("passport is hit");
		 
	  var generateHash = function(password) {

	    return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);

		};

		db.User.findOne({
        where: {
           email: email
        }
    }).then(function(signUser) {
    	console.log("does the user exist? ");
    	console.log(signUser);

    	if (signUser) {
    		console.log("user already exists");
    		return done(null, false, req.flash('signupMessage', 'That email is already taken'));
    	}

    	else {

    		var firstName = req.body.firstName;
            var lastName = req.body.lastName;
			var username = req.body.userName;
			var email = req.body.email;
			// var password = User.generateHash(req.body.password);
			// var password2 = User.generateHash(req.body.password2);
			var password = generateHash(req.body.password);
			var password2 = req.body.password2;
			console.log(req.body);

			// var newUserMysql = new Object();
			// newUserMysql.email    = email;
			// newUserMysql.password = password;
			// console.log(newUserMysql);

	    	db.User.create({firstName: firstName, lastName: lastName, username: username, email: email, password: password})
				.done(function(data) {
					// if (err) {
					// 	return done(err);
					// }
					// newUserMysql.id = data.insertId;

					console.log("the final data");
					console.log(data);
					return done(null, data, req.flash('signupMessage', 'You are now registered'));

	    	    });
			}
	});
}));

//local-login
passport.use('local-login', new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: true
}, function(req, email, password, done) {

		db.User.findOne({
        where: {
           email: email
        }
    }).then(function(logUser) {
    	console.log("does the user exist? " + logUser);
    	// console.log(logUser.password);

    var validPassword = function(testUser, password) {
    		console.log("inside validPassword function");
    		// this.password = this.password.toString();
    		// logUser.password = logUser.password.toString();
	    	return bCrypt.compareSync(password, testUser);

			};


    	if (!logUser) {
    		console.log("user was not found");
    		return done(null, false, req.flash('loginMessage', 'User not found'));
    	}

    	if (!validPassword(logUser.password, password)) {
    		console.log("password was incorrect");

    		return done(null, false, req.flash('loginMessage', 'Password is incorrect'));
    	}

    	return done(null, logUser, req.flash('loginMessage', 'Login Successfull'));
	});
}));

