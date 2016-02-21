/**
 * Created by Anthony on 2/14/16.
 */
var mongoose = require('mongoose');

var reciptShema = mongoose.Schema({
    user : { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    payer : { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items : [{type: mongoose.Schema.Types.ObjectId, ref: 'ReciptItem'}],
    date : { type: Date, default: Date.now }
});

module.exports = mongoose.model('Recipt', reciptShema);