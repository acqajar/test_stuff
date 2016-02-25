var express = require('express');
// to log requests from user
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var ejs = require('ejs'); //not powerful enough without mate
var engine = require('ejs-mate'); //flexible web pages
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('express-flash');


var secret = require("./config/secret")

var User = require('./models/user');




var app = express();
// Can also type -- express().listen();


mongoose.connect(secret.database, function(err){
	if (err){
		console.log(err);
	} else {
		console.log("Connected to database");
	}
})


// run Middleware to use morgan function
app.use(express.static(__dirname + '/public')); //for static files
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
	resave: true,
	saveUninitialized: true,
	secret: secret.secretKey,
}));



// save flash message in a session
app.use(flash());



// ejs Middleware
app.engine('ejs', engine);
app.set('view engine', 'ejs');




var userRoutes = require('./routes/user');
var mainRoutes = require('./routes/main');




app.use(mainRoutes);
app.use(userRoutes);
//
//
// app.post('/create-user', function(req, res, next){
// 	var user = new User();
//
// // based on UserSchema notation for db
// 	user.profile.name = req.body.name;
// 	user.password = req.body.password;
// 	user.email = req.body.email;
//
// 	user.save(function(err){
// 		if(err){
// 			return next(err);
// 		} else {
// 			res.json('Successfully created a new user');
// 		}
// 	});
// });


// Routing -- can be app.get('/name') and with localhost:3000/name to get respons
// app.get('/', function(req, resp){
// 	 var name = "Arsames"
// resp.json("My name is " + name)
// });


// app.get('/test', function(req, resp){
// 	 var name = "What is this"
// resp.json("My question is - " + name)
// });


// placed in ROUTES/MAIN.JS

// app.get('/', function(req, res){
// 	res.render('main/home');
// });
//
//
// app.get('/about', function(req, res){
// 	res.render('main/about');
// });

// add validation to server to see if it's running
app.listen(secret.port, function(err){
	if(err) throw err;
	console.log("Server is Running on port " + secret.port);
})
