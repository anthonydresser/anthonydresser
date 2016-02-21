/**
 * Created by Anthony on 1/8/16.
 */
var express = require('express');
var router = express.Router();
var passport = require('passport');
var request = require('request');
var HSLibrary = require('../../models/hslibrary');
var HSCard = require('../../models/hscard');
var credentials = require('../../config/credentials');

router.post('/login', function(req, res, next){
    passport.authenticate('local-login', function(err, user, info) {
        if (err) {
            return next(err);
        }

        if (!user) {
            return res.status(401).send("User not found");
        }


        req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.status(200).send({ id : user.email });
        });
    })(req, res, next);
}, function(err, req, res, next){
    res.status(500).end();
    console.log('err : ' + err + ' : ' + err.message);
});

router.post('/signup', function(req, res, next){
    passport.authenticate('local-signup', function(err, user, info){
        if(err) {
            return next(err);
        }

        if(!user) {
            return res.status(401).send("Email already in use");
        }

        req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.status(200).send({ id : user.email });
        });

    })(req, res, next);
}, function(err, req, res, next){
    res.status(500).end();
    console.log('err : ' + err + ' : ' + err.message);
});

router.post('/logout', function(req, res, next){
    req.logout();
    req.session.destroy();
    return res.status(200).end();
});

router.get('/library', function(req, res, next){
    HSLibrary.findOne({user: req.user['_id']}).populate('cards').lean().exec(function(err, entry){
        if(!entry){
            var library = new HSLibrary();
            library.user = req.user['_id'];
            library.save(function(err){
                if(err) res.status(500).end();
                res.status(200).send(library.cards);
            })
        } else {
            res.status(200).send(entry.cards);
        }
    })
});

router.put('/library', function(req, res ,next){
    console.log('searching');
    HSLibrary.findOne({user: req.user['_id']}).populate('cards').exec(function(err, entry){
        console.log('returned');
        if(!entry){
            console.log('saving 0');
            var library = new HSLibrary();
            library.user = req.user['_id'];
            var card = new HSCard();
            card.name = req.body.name;
            card.quantity = 1;
            card.save(function(err){
                if(err) {
                    res.status(500).end();
                    return;
                }
                library.cards.push(card);
                console.log('saving 3');
                library.save(function(err){
                    if(err) {
                        res.status(500).end();
                        return;
                    }
                    var returnVal = [];
                    library.cards.forEach(function(val){
                        returnVal.push(val.toObject());
                    })
                    res.status(200).send(returnVal);
                    return;
                })
            });
            library.save(function(err){
                if(err) {
                    res.status(500).end();
                    return;
                }
                var returnVal = [];
                library.cards.forEach(function(val){
                    returnVal.push(val.toObject());
                })
                res.status(200).send(returnVal);
                return;
            })
        } else {
            console.log(entry.cards);
            var found = false;
            entry.cards.every(function(val){
                if(val.name == req.body.name){
                    found = true;
                    if(val.quantity < 2){
                        val.quantity = val.quantity + 1;
                        console.log('saving 1');
                        val.save(function(err){
                            if(err) {
                                res.status(500).end();
                                return false;
                            }
                            var returnVal = [];
                            entry.cards.forEach(function(val){
                                returnVal.push(val.toObject());
                            })
                            res.status(200).send(returnVal);
                            return false;
                        })
                    } else {
                        console.log('saving 5')
                        var returnVal = [];
                        entry.cards.forEach(function(val){
                            returnVal.push(val.toObject());
                        })
                        res.status(200).send(returnVal);
                        return false;
                    }
                }
                return true;
            });
            if(!found){
                console.log('saving 2');
                var card = new HSCard();
                card.name = req.body.name;
                card.quantity = 1;
                card.save(function(err){
                    if(err) {
                        res.status(500).end();
                        return;
                    }
                    entry.cards.push(card);
                    console.log('saving 3');
                    entry.save(function(err){
                        if(err){
                            res.status(500).end();
                            return;
                        }
                        var returnVal = [];
                        entry.cards.forEach(function(val){
                            returnVal.push(val.toObject());
                        })
                        res.status(200).send(returnVal);
                        return;
                    })
                });
            }
        }
    });
});

router.delete('/library', function(req, res, next){

});

router.get('/cards/all', function(req, res, next){
    var url = "https://omgvamp-hearthstone-v1.p.mashape.com/cards?collectible=1";
    var headers = {
        "X-Mashape-Key": "YufvlVTmtDmshInaCbO1vRYEt3o3p19p5MRjsnNXGg6QnNFLLH"
    };
    request({url: url, headers: headers}, function(error, response, body){
        res.send(body);
    });
});

router.get('/card', function(req, res, next){
    var url = "https://omgvamp-hearthstone-v1.p.mashape.com/cards/search/" + req.query.name;
    var headers = {
        "X-Mashape-Key": "YufvlVTmtDmshInaCbO1vRYEt3o3p19p5MRjsnNXGg6QnNFLLH"
    };
    request({url: url, headers: headers}, function(error, response, body){
        res.send(body);
    });
});

module.exports = router;