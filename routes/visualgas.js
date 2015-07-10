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
});

router.post('/login', function(req, res, next){
  passport.authenticate('local-login', function(err, user, info) {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(401).send("User not found");
    }

    res.status(200).send({ id:user['_id'], email: user.email });
  })(req, res, next);
}, function(err, req, res, next){
  res.status(500).end();
  console.log('err : ' + err + ' : ' + err.message);
});

router.post('/signup', function(req, res, next){
  passport.authenticate('local-signup', function(err, user, info){
    if(err) {
      return next(err);
    }

    if(!user) {
      return res.status(401).send("Email already in use");
    }

    res.status(200).send({ id:user['_id'], email: user.email });

  })(req, res, next);
}, function(err, req, res, next){
  res.status(500).end();
  console.log('err : ' + err + ' : ' + err.message);
});

router.post('/logout', function(req, res, next){
  req.logout();
  req.session.destroy();
  return res.status(200).end();
});

function isAuth(req, res, next) {
  if(req.isAuthenticated()) return next();
  else return res.status(401).end();
}

module.exports = router;
