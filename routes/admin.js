var router = require('express').Router();
var Category = require('../models/category');


router.get('/add-category', function(req,res,next){
  res.render('admin/add-category', {message: req.flash('success') });
});

router.post('/add-category', function(req,res,next){
  var category = new Category();//create new object from Category schema
  category.name = req.body.name; //equal to input text name

  category.save(function(err){
    if(err) return next(err);
      req.flash('success', 'Successfully added a category');
      console.log(category.name);
      return res.redirect('/add-category')
  });
});


module.exports = router;
