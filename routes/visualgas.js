var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/', function(req, res, next){
  var user;
  if(req.user)  {user = req.user}
  res.render('visualgas/template',
             {
               title:'Visual Gas',
               user: user
             }
  );
});

router.get('/home', function(req, res, next){
  var user;
  if(req.user)  {user = req.user}
  res.render('visualgas/home',
             {
               title:'Visual Gas',
               user: user
             }
  );
})

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
  if(!req.user) {
    res.render('visualgas/signup',
               {
                 title:'Sign Up',
                 user: user,
                 message: req.flash('signupMessage')
               }
    );
  } else res.redirect('/visualgas');
})

router.get('/login', function(req, res, next){
  var user;
  if(!req.user){
    res.render('visualgas/login',
               {
                 title:'Login',
                 user: user,
                 message: req.flash('loginMessage')
               }
    );
  } else res.redirect('/visualgas/home');
})

router.post('/login', passport.authenticate('local-login', {
  successRedirect : '/visualgas',
  failureRedirect : '/visualgas/login',
  failureFlash : true
}));

router.post('/signup', passport.authenticate('local-signup', {
  successRedirect : '/visualgas/account',
  failureRedirect : '/visualgas/signup',
  failureFlash : true
}));

router.post('/logout', function(req, res, next){
  req.logout();
  req.session.destroy();
  res.redirect('/visualgas');
});

function isAuth(req, res, next) {
  if(req.isAuthenticated()) return next();

  res.redirect('/login');

}

module.exports = router;
