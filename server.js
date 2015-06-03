// server.js

//set up =========

var express = require('express'),
	app = express(), //create app with express
	mongoose = require('mongoose'), // mongoose for mongodb
	morgan = require('morgan'), // log requests to the console (express4)
	bodyParser = require('body-parser'), // pull info from HTML POST (express4)
	methodOverride = require('method-override'); //simulate DELETE and PUT (express4)

//configuration

mongoose.connect('mongodb://dima:111@proximus.modulusmongo.net:27017/asO5vono'); //connect to mongodb database

app.use(express.static(__dirname + '/public')); // set the static files location
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");