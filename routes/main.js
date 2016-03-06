var router = require('express').Router();
var User = require('../models/user');


router.get('/', function(req, res){
	res.render('main/home');
});


router.get('/about', function(req, res){
	res.render('main/about');
});

module.exports = router;


router.get('/users', function(req,res){
	User.find({}, function(err,users){
		res.json(users);
	 	console.log(users);
	});
});
