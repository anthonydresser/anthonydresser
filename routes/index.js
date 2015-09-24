var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('template', { title: 'Anthony Dresser' });
});
router.get('/resume', function(req, res, next){
  res.send('resources/addresser_resume.pdf');
})

router.get('/partials/:filename', function(req, res, next){
  res.render('./partials/' + req.params.filename);
});

module.exports = router;
