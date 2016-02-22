var express = require('express');
// to log requests from user
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var ejs = require('ejs'); //not powerful enough without mate
var engine = require('ejs-mate'); //flexible web pages




var User = require('./models/user');



var app = express();
// Can also type -- express().listen();


mongoose.connect('mongodb://root:charles@ds013908.mongolab.com:13908/ecommerce', function(err){
	if (err){
		console.log(err);
	} else {
		console.log("Connected to database");
	}
})


// run Middleware to use morgan function
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// ejs Middleware
app.engine('ejs', engine);
app.set('view engine', 'ejs');






app.post('/create-user', function(req, res, next){
	var user = new User();

// based on UserSchema notation for db
	user.profile.name = req.body.name;
	user.password = req.body.password;
	user.email = req.body.email;

	user.save(function(err){
		if(err){
			return next(err);
		} else {
			res.json('Successfully created a new user');
		}
	});
});


// Routing -- can be app.get('/name') and with localhost:3000/name to get respons
// app.get('/', function(req, resp){
// 	 var name = "Arsames"
// resp.json("My name is " + name)
// });


// app.get('/test', function(req, resp){
// 	 var name = "What is this"
// resp.json("My question is - " + name)
// });



app.get('/', function(req, res){
	res.render('home');
});


app.get('/about', function(req, res){
	res.render('about');
});

// add validation to server to see if it's running 
app.listen(3000, function(err){
	if(err) throw err;
	console.log("Server is Running");
})