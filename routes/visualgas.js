var express = require('express');
var router = express.Router();
var passport = require('passport');
var Entry = require('../models/entry')

router.get('/', function(req, res, next){
  var user;
  if(req.user)  {user = req.user}
  res.render('visualgas/templates/main',
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


    req.logIn(user, function(err) {
     if (err) { return next(err); }
     return res.status(200).send({ id : user.email });
   });
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

    req.logIn(user, function(err) {
     if (err) { return next(err); }
     return res.status(200).send({ id : user.email });
   });

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

router.get('/templates/addentrymodal', function(req, res, next){
  res.render('visualgas/templates/addentrymodal');
})

router.post('/addEntry', isAuth, function(req, res, next) {
  console.log(req.body)
  if(isEmpty(req.body.mileage) || isEmpty(req.body.gallons) || isEmpty(req.body.date)) return res.status(400).end();

  var entry = new Entry();

  var date = new Date(req.body.date);

  entry.mileage = req.body.mileage;
  entry.gallons = req.body.gallons;
  entry.user = req.user['_id'];
  entry.date = date;

  entry.save(function(err){
    if(err) res.status(500).end()
    res.status(200).send(entry);
  });
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
