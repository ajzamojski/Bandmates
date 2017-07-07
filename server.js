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
var http = require('http').createServer(app)
var io = require('socket.io')(http);


app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
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

app.get('/user/events/?', function(req,res) {
    res.sendFile(__dirname + "/public/index.html");
});

app.get('/user/search', function(req,res) {
    res.sendFile(__dirname + "/public/index.html");
});

app.get('/user/profile/:username', function(req,res) {
    res.sendFile(__dirname + "/public/index.html");
});

app.get('/user/settings', function(req,res) {
    res.sendFile(__dirname + "/public/index.html");
});

app.get('/user/messenger', function(req,res) {
    res.sendFile(__dirname + "/public/index.html");
});

// app.get('*', function(req,res) {
//     res.sendFile(__dirname + "/public/index.html");
// });

//------------------- API ROUTES ------------------------
//get route for all musicians
app.get("/api/musicians/:instrument/:gender", function(req, res) {
    db.User.findAll({
        attributes: { exclude: ['password'] },
        where: {
            instruments: req.params.instrument,
            gender: req.params.gender,
            }
    }).then(function(data) {
      res.json(data);
      console.log(data);
      res.end();
    });
});

//get contacts by userid
app.get("/api/contacts/:userID", function(req,res) {
    var query = req.params.userID;
    db.Contacts.findAll({
        where: {
            user_id: query
        }
    }).then(function(data) {
        res.json(data);
        res.end();
    })
});

//get userinfo by id
app.get("/api/userContacts/:userID", function(req,res) {
    var query = req.params.userID;
    db.User.findAll({
        where: {
            id: query
        }
    }).then(function(data) {
        res.json(data);
        res.end();
    })
});

//post new contact by userid + contactID
app.post("/api/newContact/:userID/:contactID", function(req, res) {
    db.Contacts.create({
        user_id: req.params.userID,
        contact_id: req.params.contactID,
        timestamp: Date.now()
    }).then(function(data) {
      res.json(data);
    });
});

//get route for username param filter
app.get("/api/user/:username", function(req, res) {
    var query = req.params.username;
    db.User.findOne({
      where: {
        username: query
      }
    }).then(function(data) {
      res.json(data);
      console.log(data);
      res.end();
    });
});

//-------------------------------------------------------
// app.post('/user/messenger', (req, res) => {
//   const { Body, From, MediaUrl0 } = req.body
//   const message = {
//     body: Body,
//     from: From.slice(8),
//     img: MediaUrl0
//   }
//   io.emit('message', message)
//   res.send(`
//            <Response>
//             <Message>Thanks for texting!</Message>
//            </Response>
//     `)
// })

// Syncing our sequelize models and then starting our express app
db.sequelize.sync({}).then(function() {
    
    io.on('connection', function(socket) {
        socket.on('message', function(body) {
            io.emit('message', {
                body,
                from: socket.id.slice(8)
            })
        })
    });

    http.listen(PORT, function() {
        console.log("App listening on PORT " + PORT);
    });
});