/**
 * Created by Anthony on 2/15/16.
 */
var express = require('express');
var router = express.Router();
var passport = require('passport');
var UserOwnership = require('../../models/userOwnership');
var Recipt = require('../../models/recipt');
var ReciptItem = require('../../models/reciptItem');
var User = require('../../models/user');
var Q = require('q');

router.post('/login', function(req, res, next){
    console.log("hello")
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

router.post('/logout', isAuth, function(req, res, next){
    req.logout();
    req.session.destroy();
    return res.status(200).end();
});

router.post('/recipt', isAuth, function(req, res, next){

    var recipt = new Recipt();
    var date = new Date();

    recipt.user = req.user['_id'];
    recipt.payer = req.body.payer;
    recipt.date = date;
    recipt.items = [];

    var topDeffered = [];

    req.body.entries.forEach(function(item, index, array){
        var defered = new Q.defer();
        var reciptItem = new ReciptItem();

        reciptItem.name = item.name;
        reciptItem.price = item.price;
        reciptItem.quantity = item.quantity;
        reciptItem.users = [];
        var deferredArray = [];

        item.users.forEach(function(user, index, array){
            var deferred = new Q.defer();
            var userOwnership = new UserOwnership();

            userOwnership.user = user['_id'];
            userOwnership.owned = user.ownership;

            userOwnership.save(function(err){
                if(err) console.log(err);
                reciptItem.users.push(userOwnership['_id']);
                deferred.resolve();
            })

            deferredArray.push(deferred.promise);
        })

        Q.all(deferredArray).then(function(){

            reciptItem.save(function(err){
                if(err) console.log(err);
                recipt.items.push(reciptItem['_id']);
                defered.resolve();
            })
        })

        topDeffered.push(defered.promise);

    })

    Q.all(topDeffered).then(function(){
        recipt.save(function(err){
            if(err) console.log(err);
            else{
                res.status(200).end();
            }
        })
    });

});

router.put('/recipt', isAuth, function(req, res, next){
    console.log("Hello");
});

router.delete('/recipt', isAuth, function(req, res, next){
    console.log("Hello");
});

router.get('/recipt', isAuth, function(req, res, next){
    console.log('get recipt');
    if(req.query['type']){
        switch(req.query['type']){
            case 'mine':
                console.log('get mine');
                Recipt.find({user: req.user['_id']}).lean().populate('items').populate('payer', 'email').exec(function(err, docs){
                    UserOwnership.populate(docs, {
                        path: 'items.users'
                    }, function(){
                        User.populate(docs, {
                            path: 'items.users.user',
                            select: 'email'
                        }, function(){
                            res.status(200).send(docs);
                        })
                    })
                })
                break;
            case 'included':
                var recipts = [];
                var deferredArray = [];
                console.log('get included');
                UserOwnership.find({user: req.user['_id']}).lean().exec(function(err, docs){
                    docs.forEach(function(docs){
                        ReciptItem.find({users: docs['_id']}).lean().exec(function(err, docs){
                            docs.forEach(function(docs){
                                Recipt.find({items: docs['_id'], user: { $ne: req.user['_id']}}).lean().populate('items').populate('payer').exec(function(err, docs){
                                    var deferred = Q.defer();
                                    UserOwnership.populate(docs, {
                                        path: 'items.users'
                                    }, function(){
                                        User.populate(docs, {
                                            path: 'items.users.user',
                                            select: 'email'
                                        }, function(){
                                            recipts.push(docs);
                                            deferred.resolve();
                                        })
                                    })
                                    deferredArray.push(deferred.promise);
                                })
                            })
                        })
                    })
                })
                Q.all(deferredArray).then(function(){
                    res.status(200).send(recipts);
                })
                break;
        }
    }
});

router.get('/users', isAuth, function(req, res){
    User.find({}).select('email').lean().exec(function (err, docs){
        //docs.forEach(function(element, index, array){
        //    delete element.password;
        //})
        res.status(200).send(docs);
    });
});

function isAuth(req, res, next) {
    if(req.isAuthenticated()) return next();
    else return res.status(401).end();
}

module.exports = router;