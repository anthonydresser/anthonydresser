var express = require('express');
var router = express.Router();


router.get('/home', function(req, res, next){
  res.render('visualgas/home');
});

router.get('/data', function(req, res, next){
  res.render('visualgas/data');
});

router.get('/account', function(req, res, next){
  res.render('visualgas/account');
});

router.get('/signup', function(req, res, next){
  res.render('visualgas/signup');
});

router.get('/login', function(req, res, next){
  res.render('visualgas/login');
});

router.get('/templates/addentrymodal', function(req, res, next){
  res.render('visualgas/templates/addentrymodal');
});

router.get('/*', function(req, res, next){
  var user;
  if(req.user)  {user = req.user}
  res.render('visualgas/templates/main',
      {
        title:'Visual Gas'
      }
  );
});

function isAuth(req, res, next) {
  if(req.isAuthenticated()) return next();
  else return res.status(401).end();
}

function isEmpty(obj) {

  // null and undefined are "empty"
  if (obj == null) return true;

  // Assume if it has a length property with a non-zero value
  // that property is correct.
  if (obj.length > 0)    return false;
  if (obj.length === 0)  return true;

  // check to see if the obj has its own properties
  for (var key in obj) {
    if (hasOwnProperty.call(obj, key)) return false;
  }

  return true;
}

module.exports = router;
