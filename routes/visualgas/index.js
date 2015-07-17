var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
  var user;
  if(req.user)  {user = req.user}
  res.render('visualgas/templates/main',
             {
               title:'Visual Gas'
             }
  );
});

router.get('/home', function(req, res, next){
  var user;
  if(req.user)  {user = req.user}
  res.render('visualgas/home');
})

router.get('/data', function(req, res, next){
  var user;
  if(req.user)  {user = req.user}
  res.render('visualgas/data');
});

router.get('/account', function(req, res, next){
  var user;
  if(req.user)  {user = req.user}
  res.render('visualgas/account');
});

router.get('/signup', function(req, res, next){
  var user;
  if(!req.user) {
    res.render('visualgas/signup');
  } else res.redirect('/visualgas');
})

router.get('/login', function(req, res, next){
  var user;
  if(!req.user){
    res.render('visualgas/login');
  } else res.redirect('/visualgas/home');
});

router.get('/templates/addentrymodal', function(req, res, next){
  res.render('visualgas/templates/addentrymodal');
})

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
