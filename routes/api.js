var express = require('express');
var router = express.Router();
var Project = require('../models/project');

router.get('/projects', function(req, res, next){
  Project.find().lean().exec(function(err, docs){
    res.status(200).send(docs);
  })
});

module.exports = router;
