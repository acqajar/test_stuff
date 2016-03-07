var router = require('express').Router();
var User = require('../models/user');
var Product = require('../models/product');


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

// double dot specifies certain route
// router.get('/products/:id', function(req,res,next){
// 	Product //querying a product
// 		.find({ category: req.params.id}) //how to access parameters in the route :id
// 		.populate('category') //only if category is ObjectId which is true in Category Schema
// 		.exec(function(err,products){ //execute anonymous funciton on all methods i.e. .find and .exec
// 			if(err) return next(err);
// 			res.render('main/category', {
// 				products: products
// 			});
// 		});
// });




router.get('/products/:id', function(req, res, next) {
  Product
    .find({ category: req.params.id })
    .populate('category')
    .exec(function(err, products) {
      if (err) return next(err);
      res.render('main/category', {
        products: products
      });
    });
});


router.get('/product/:id', function(req, res, next) {
  Product.findById({ _id: req.params.id }, function(err, product) {
    if (err) return next(err);
    res.render('main/product', {
      product: product
    });
  });
});
