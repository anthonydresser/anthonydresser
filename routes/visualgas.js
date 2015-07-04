var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/', function(req, res, next){
  var user;
  if(req.user)  {user = req.user}
  res.render('visualgas/index',
             {
               title:'Visual Gas',
               user: user
             }
  );
});

router.get('/data', function(req, res, next){
  var user;
  if(req.user)  {user = req.user}
  res.render('visualgas/data',
             {
               title:'My Data',
               user: user
             }
  );
});

router.get('/account', function(req, res, next){
  var user;
  if(req.user)  {user = req.user}
  res.render('visualgas/account',
             {
               title:'My Account',
               user: user
             }
  );
});

router.get('/signup', function(req, res, next){
  var user;
  if(req.user)  {user = req.user}
  res.render('visualgas/signup',
             {
               title:'Sign Up',
               user: user
             }
  );
})

router.get('/login', function(req, res, next){
  var user;
  if(req.user)  {user = req.user}
  res.render('visualgas/login',
             {
               title:'Login',
               user: user
             }
  );
})

router.post('/login', function(req, res, next){

})

router.post('/signup', passport.authenticate('local-signup', {
  successRedirect : '/visualgas/account',
  failureRedirect : '/visualgas/signup',
  failureFlash : true
}));

function isAuth(req, res, next) {
  if(req.isAuthenticated()) return next();

  res.redirect('/login');

}

module.exports = router;
