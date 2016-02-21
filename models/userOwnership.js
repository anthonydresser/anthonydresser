/**
 * Created by Anthony on 2/14/16.
 */
var mongoose = require('mongoose');

var userOwnershipSchema = mongoose.Schema({
    user : { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    owned : Number
});

module.exports = mongoose.model('UserOwnership', userOwnershipSchema);
