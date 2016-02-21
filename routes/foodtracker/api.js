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
    console.log("Hello");
    console.log(req.body);
    console.log(req.body.entries[0].users);

    var recipt = new Recipt();
    var date = new Date();

    recipt.user = req.user['_id'];
    recipt.date = date;
    recipt.items = [];

    var topDeffered = [];

    req.body.entries.forEach(function(item, index, array){
        var defered = new Q.defer();
        console.log('entering item');
        var reciptItem = new ReciptItem();

        reciptItem.name = item.name;
        reciptItem.price = item.price;
        reciptItem.quantity = item.quantity;
        reciptItem.users = [];
        var deferredArray = [];

        item.users.forEach(function(user, index, array){
            var deferred = new Q.defer();
            console.log('entrering reciupt');
            var userOwnership = new UserOwnership();

            userOwnership.user = user['_id'];
            userOwnership.owned = user.ownership;

            console.log('saving uysers')

            userOwnership.save(function(err){
                if(err) console.log(err);
                console.log('saved');
                reciptItem.users.push(userOwnership['_id']);
                deferred.resolve();
            })

            deferredArray.push(deferred.promise);
        })

        Q.all(deferredArray).then(function(){
            console.log('saving recipt item');

            reciptItem.save(function(err){
                if(err) console.log(err);
                recipt.items.push(reciptItem['_id']);
                console.log('sabedl');
                defered.resolve();
            })
        })

        topDeffered.push(defered.promise);

    })

    Q.all(topDeffered).then(function(){
        console.log('saving recipt');
        recipt.save(function(err){
            if(err) console.log(err);
            else{
                console.log('finished');
                res.status(200).end();
            }
        })
    });

});

router.put('/recipt', function(req, res, next){
    console.log("Hello");
});

router.delete('/recipt', function(req, res, next){
    console.log("Hello");
});

router.get('/recipt', function(req, res, next){
    console.log("Hello");
});

router.get('/users', isAuth, function(req, res){
    console.log("Hello");
    //if(req.query['type'] &&  req.query['type'] == 'all'){
    User.find({}).lean().exec(function (err, docs){
        docs.forEach(function(element, index, array){
            delete element.password;
        })
        res.status(200).send(docs);
    });
    //}
});

function isAuth(req, res, next) {
    if(req.isAuthenticated()) return next();
    else return res.status(401).end();
}

module.exports = router;