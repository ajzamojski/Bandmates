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

// app.post('/api/events', function(req,res) {
//   console.log('post:' + res);
//   res.json(res)
// })

// app.get('*', function(req,res) {
//     res.sendFile(__dirname + "/public/index.html");
// });

//------------------- API ROUTES ------------------------
//get route for all musicians
app.get("/api/musicians", function(req, res) {
    db.User.findAll({
        attributes: { exclude: ['password'] },
        // where: {
        //     instruments: {
            //     $or: {
                //     $eq: req.params.instrument,
                //     $eq: null
                    // }
            // },
        //     gender: req.params.gender,
        //     profession: req.params.profession
        // }
    }).then(function(data) {
      res.json(data);
      console.log(data);
      res.end();
    });
});

app.get("/api/contacts/:userId", function(req,res) {
    var query = req.params.userId;
    db.Contacts.findAll({
        where: {
            user_id: query
        }
    }).then(function(data) {
        res.json(data);
        console.log(data);
        res.end();
    })
});

//get route for param filter
app.get("/api/musicFilter?", function(req, res) {
    var query = req.params.musicFilter;
    console.log(query);
    db.User.findAll({
    //   where: {
    //     study_subject: query
    //   }
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