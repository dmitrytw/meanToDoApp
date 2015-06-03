// server.js

//set up =========

var express = require('express'),
	app = express(), //create app with express
	mongoose = require('mongoose'), // mongoose for mongodb
	morgan = require('morgan'), // log requests to the console (express4)
	bodyParser = require('body-parser'), // pull info from HTML POST (express4)
	methodOverride = require('method-override'); //simulate DELETE and PUT (express4)

//configuration

mongoose.connect('mongodb://dima:111@proximus.modulusmongo.net:27017/E8movizy'); //connect to mongodb database

app.use(express.static(__dirname + '/public')); // set the static files location
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());




//define model

var Todo = mongoose.model('Todo', {
	text: String
});

// creating RESTful API Routes

	//api------------------
	//get all todos
	app.get('/api/todos', function(req, res) {
		//use mongoose to get all todos in the db
		Todo.find(function(err, todos) {
			// if there is an error retrieving, send the error, nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(todos); //return all todos in JSON format 
		});
	});

	// create todo and send back all todos after creation
	app.post('/api/todos', function(req, res) {

		//create a todo, information comes from AJAX request from Angular
		Todo.create({
			text: req.body.text,
			done: false
		}, function(err, todo){
			if (err)
				res.send(err);
			//get and return all the todos after you create another
			Todo.find(function(err, todos) {
				if (err)
					res.send(err)
				res.json(todos);
			});
		});

	});

	// delete a todo
    app.delete('/api/todos/:todo_id', function(req, res) {
        Todo.remove({
            _id : req.params.todo_id
        }, function(err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Todo.find(function(err, todos) {
                if (err)
                    res.send(err)
                res.json(todos);
			});
		});
	});


// application-------------------
app.get('*', function(req, res){
	res.sendfile('./public/index.html'); //load the single view file (angular will handle the pade changed on the front-end)

});






// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");

