/**
 * Created by Anthony on 8/26/15.
 */
var express = require('express');
var router = express.Router();
var creds = require('../../config/credentials');
var Recipe = require('../../models/recipe');
var request = require('request');
var Q = require('q');

router.get('/', function(req, res, next){
    Recipe.find().lean().exec(function(err, docs){
        var recipeHolder = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
        var bestRecipes = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
        docs.forEach(function(recipe, index, array){
            if(recipe.disciplines.indexOf('Weaponsmith') > -1 && recipe['min_rating'] < 500 && recipe.flags.length === 0){
                recipeHolder[Math.floor(recipe['min_rating']/25)].push(recipe);
            }
        });
        var numberOfIngredients = 0;
        recipeHolder.forEach(function(array, index, originarray){
            array.forEach(function(recipe, index, array){
                numberOfIngredients += recipe.ingredients.length;
            })
        })
        var deferredArray = [];
        var finished = 0;
        recipeHolder.forEach(function(array, index, originArray){
            array.forEach(function(recipe, index, array){
                recipe.ingredients.forEach(function(ingredient, index, array){
                    var url = 'https://api.guildwars2.com/v2/commerce/prices/' + ingredient['item_id'];
                    var deferred = new Q.defer();
                    if(deferredArray.length > 0) {
                        deferredArray[deferredArray.length - 1].then(function() {
                            request.get(url, function priceCallback(error, response, body) {
                                if (error) {
                                    console.log('price error', error);
                                    request.get(url, priceCallback);
                                } else {
                                    body = JSON.parse(body);
                                    if (body.text) {
                                        console.log("couldn't find", ingredient['item_id']);
                                    } else if (!recipe.price) {
                                        recipe.price = body.buys['unit_price'];
                                    } else {
                                        recipe.price += body.buys['unit_price'];
                                    }
                                    console.log('finished', finished++, 'of', numberOfIngredients);
                                    deferred.resolve();
                                }
                            })
                        })
                        deferredArray.push(deferred.promise);
                    } else {
                        request.get(url, function priceCallback(error, response, body) {
                            if (error) {
                                console.log('price error', error);
                                request.get(url, priceCallback);
                            } else {
                                //console.log('url', url);
                                //console.log('body', body);
                                body = JSON.parse(body);
                                if (body.text) {

                                } else if (!recipe.price) {
                                    recipe.price = body.buys['unit_price'];
                                } else {
                                    recipe.price += body.buys['unit_price'];
                                }
                                console.log('finished', finished++, 'of', numberOfIngredients);
                                deferred.resolve();
                            }
                        })
                        deferredArray.push(deferred.promise);
                    }
                })
            })
        })
        Q.all(deferredArray).then(function(){
            console.log('getting prices completed');
            console.log('finding cheapest');
            recipeHolder.forEach(function(array, oldIndex, originArray){
                array.forEach(function(recipe, index, array){
                    if(bestRecipes[oldIndex].length < 12){
                        bestRecipes[oldIndex].push(recipe);
                    } else {
                        bestRecipes[oldIndex].forEach(function(spot, index, array){
                            if(spot.price > recipe.price){
                                array[index] = recipe;
                            }
                        })
                    }
                })
            })
            console.log('done', bestRecipes);
            var promises = [];
            bestRecipes.forEach(function(array, index, originarray){
                array.forEach(function(recipe, index, array){
                    var deferred = new Q.defer();
                    if(promises.length > 0){
                        promises[promises.length - 1].then(function(){
                            request('https://api.guildwars2.com/v2/items/' + recipe.id, function nameCallback(error, response, body){
                                if(error){
                                    console.log('naming error', error);
                                    request('https://api.guildwars2.com/v2/items/' + recipe.id, nameCallback);
                                } else {
                                    console.log(body.name, 'at', recipe.price);
                                    deferred.resolve();
                                }
                            })
                        })
                        promises.push(deferred.promise);
                    } else {
                        request('https://api.guildwars2.com/v2/items/' + recipe.id, function nameCallback(error, response, body){
                            if(error){
                                console.log('naming error', error);
                                request('https://api.guildwars2.com/v2/items/' + recipe.id, nameCallback);
                            } else {
                                console.log(body.name, 'at', recipe.price);
                                deferred.resolve();
                            }
                        })
                        promises.push(deferred.promise);
                    }
                })
            })
        })
    })
});

router.get('/tp/current/sells', function(req, res, next){
    var url = 'https://api.guildwars2.com/v2/commerce/transactions/current/sells';
    var headers = {
        'Authorization': 'Bearer ' + creds.gw2ApiKey,
    };
    request({url: url, headers: headers}, function(erorr, response, body){
        res.send(body);
    });
});

router.get('/tp/current/buys', function(req, res, next){
    var url = 'https://api.guildwars2.com/v2/commerce/transactions/current/buys';
    var headers = {
        'Authorization': 'Bearer ' + creds.gw2ApiKey,
    };
    request({url: url, headers: headers}, function(erorr, response, body){
        res.send(body);
    });
})

router.get('/tp/history/sells', function(req, res, next){
    var url = 'https://api.guildwars2.com/v2/commerce/transactions/history/sells';
    var headers = {
        'Authorization': 'Bearer ' + creds.gw2ApiKey,
    };
    request({url: url, headers: headers}, function(erorr, response, body){
        res.send(body);
    });
});

router.get('/tp/history/buys', function(req, res, next){
    var url = 'https://api.guildwars2.com/v2/commerce/transactions/history/buys';
    var headers = {
        'Authorization': 'Bearer ' + creds.gw2ApiKey,
    };
    request({url: url, headers: headers}, function(erorr, response, body){
        res.send(body);
    });
})

module.exports = router;