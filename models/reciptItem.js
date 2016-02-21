/**
 * Created by Anthony on 2/14/16.
 */
var mongoose = require('mongoose');

var reciptItemSchema = mongoose.Schema({
    name : String,
    price : Number,
    qantity : Number,
    users : [{type : mongoose.Schema.ObjectId, ref: 'UserOwnership'}]
});

module.exports = mongoose.model('ReciptItem', reciptItemSchema);
