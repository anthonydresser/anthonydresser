var express = require('express');
var router = express.Router();
var passport = require('passport');
var Entry = require('../../models/entry');
var nodemailer = require('nodemailer');
var credentials = require('../../config/credentials');
var transporter = nodemailer.createTransport('SMTP', {
  service: 'Gmail',
  auth: {
    user: credentials.emailUsername,
    pass: credentials.emailPassword
  }
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

router.post('/entry', isAuth, function(req, res, next) {
  if(isEmpty(req.body.mileage) || isEmpty(req.body.gallons) || isEmpty(req.body.date) || isEmpty(req.body.ppg)) return res.status(400).end();

  var entry = new Entry();

  var date = new Date(req.body.date);

  entry.mileage = req.body.mileage;
  entry.gallons = req.body.gallons;
  entry.ppg = req.body.ppg;
  entry.user = req.user['_id'];
  entry.date = date;

  entry.save(function(err){
    if(err) res.status(500).end()
    res.status(200).send(entry);
  });
});

router.delete('/entry', isAuth, function(req, res, next){
  if(isEmpty(req.query.id)) return res.status(400).end();

  Entry.findOne({'_id' : req.query.id}).select('user').exec(function(err, entry){
    if(err) return next(err);
    if(JSON.stringify(entry.user) == JSON.stringify(req.user['_id'])){
      entry.remove();
      res.status(200).end();
    } else {
      res.status(403).end();
    }
  });
})

router.get('/entries', isAuth, function(req, res, next) {
  Entry.find({user: req.user['_id']}).lean().exec(function (err, docs){
    res.status(200).send(docs);
  });
});

router.post('/recommendation', isAuth, function(req, res, next){
  if(isEmpty(req.body.email) || isEmpty(req.body.subject)) return res.status(400).end();

  if(req.body.email.indexOf('<script>') > -1){
    console.log('User ' + req.user['_id'] + ' attempted to inject a script into the email service');
    return res.status(400).end()
  }

  var email = '<p>' + req.body.email + '</p><p>Sent from user ' + req.user['_id'] + '</p>';

  transporter.sendMail({
    from: req.user.email,
    to: credentials.emailUsername,
    subject: req.body.subject,
    text: email
  })

  return res.status(200).end();
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
