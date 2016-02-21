/**
 * Created by Anthony on 1/10/16.
 */
var mongoose = require('mongoose');

var hslibrarySchema = mongoose.Schema({
    user : { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    cards : [{ type : mongoose.Schema.ObjectId, ref: 'HSCard' }]
});

module.exports = mongoose.model('HSLibrary', hslibrarySchema);
