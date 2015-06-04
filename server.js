// server.js

//set up =========

var express = require('express'),
	app = express(), //create app with express
	mongoose = require('mongoose'), // mongoose for mongodb
	port = process.env.PORT || 8080, // set the port
	database = require('./config/database'), //load the database config
	morgan = require('morgan'), // log requests to the console (express4)
	bodyParser = require('body-parser'), // pull info from HTML POST (express4)
	methodOverride = require('method-override'); //simulate DELETE and PUT (express4)

//configuration 
mongoose.connect(database.url); //connect to mongodb database

app.use(express.static(__dirname + '/public')); // set the static files location
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

//load the routes
require('./app/routes.js')(app);

// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port" + port);

