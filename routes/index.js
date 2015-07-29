var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('template', { title: 'Anthony Dresser' });
});

router.get('/projects', function(req, res, next) {
  res.render('projects');
});

router.get('/home', function(req, res, next){
  res.render('home');
})

module.exports = router;
