var mongoose = require('mongoose');

var entrySchema = mongoose.Schema({
  user : { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  gallons : Number,
  mileage : Number,
  ppg : Number,
  date : { type: Date, default: Date.now }
});

module.exports = mongoose.model('Entry', entrySchema);
