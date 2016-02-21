var mongoose = require('mongoose');

var hscardSchema = mongoose.Schema({
    name : String,
    quantity: Number
});

module.exports = mongoose.model('HSCard', hscardSchema);
