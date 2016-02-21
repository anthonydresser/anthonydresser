var express = require('express');
var router = express.Router();


router.get('/partials/:filename', function(req, res, next){
  res.render('./hearthstone/partials/' + req.params.filename);
});

/* GET home page. */
router.get('/*', function(req, res, next) {
  res.render('hearthstone/template', { title: 'Hearthstone Library Tracker' });
});

module.exports = router;
