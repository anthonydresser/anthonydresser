var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/', function(req, res, next){
  console.log('Rending app');
  res.render('visualgas/index', {title:'Visual Gas'});
});

router.get('/data', function(req, res, next){
  res.render('visualgas/data', {title:'My Data'});
});

router.get('/account', function(req, res, next){
  res.render('visualgas/account', {title: 'Account'});
});

router.post('/signup', passport.authenticate('signup', {
  successRedirect : '/account',
  failureRedirect : '/signup',
  failureFlash : true
}));

module.exports = router;
