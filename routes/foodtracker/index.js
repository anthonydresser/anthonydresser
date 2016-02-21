var express = require('express');
var router = express.Router();


router.get('/partials/:filename', function(req, res){
  res.render('./foodtracker/partials/' + req.params.filename);
});

/* GET home page. */
router.get('/*', function(req, res) {
  res.render('foodtracker/template', { title: 'Food Tracker' });
});

module.exports = router;
