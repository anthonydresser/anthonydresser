var mongoose = require('mongoose');

var projectSchema = mongoose.Schema({
  name : String,
  short : String,
  body : String,
  link : String,
  image : String,
  tags : [String]
})

module.exports = mongoose.model('Project', projectSchema);
