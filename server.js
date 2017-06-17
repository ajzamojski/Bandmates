var express = require('express');
var bodyParser = require("body-parser");
var logger = require("morgan");

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("./public"));

//--------------------------- ROUTES ---------------------------

//route for react HTML page
app.get('/', function(req,res) {
    res.sendFile(__dirname + "./public/index.html");
});

app.get('/user', function(req,res) {
    res.sendFile(__dirname + "/public/user.html");
});

// Syncing our sequelize models and then starting our express app
db.sequelize.sync({}).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});