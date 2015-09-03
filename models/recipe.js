/**
 * Created by Anthony on 8/26/15.
 */
var mongoose = require('mongoose');

var recipeSchema = mongoose.Schema({
    type : String,
    output_item_id : Number,
    output_item_count: Number,
    min_rating : Number,
    time_to_craft_ms : Number,
    disciplines: [String],
    flags : [String],
    ingredients : {type: Array, "default" : []},
    id: Number
});

module.exports = mongoose.model('Recipe', recipeSchema);
