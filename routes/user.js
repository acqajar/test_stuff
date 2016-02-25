var router = require('express').Router();
var User = require('../models/user') //have to require User from Models


//next is a callback, if there is an error
router.get('/signup', function(req, res, next){
  res.render('accounts/signup', {
    errors: req.flash('errors')
  });
});



// post signup
router.post('/signup', function(req, res, next) {
  var user = new User();
  user.profile.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;

  User.findOne({ email: req.body.email }, function(err, existingUser){
    if (existingUser) {
      req.flash('errors', 'Account with that email address already exists');
      return res.redirect('/signup');
    } else {
      user.save(function(err, user){
        if (err) return next(err);
        return res.redirect('/');
      });
    }
  });
});





module.exports = router;
//
// router.post('/signup', function(req, res, next){
// 	var user = new User();
//
//
// // based on UserSchema notation for db
// 	user.profile.name = req.body.name;
// 	user.password = req.body.password;
// 	user.email = req.body.email;
//
//
//
// 	user.save(function(err){
// 		if(err){
// 			return next(err);
// 		} else {
// 			res.json('Successfully created a new user');
// 		}
// 	});
// });
