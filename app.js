var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var Q = require('q');
var request = require('request');
var Recipe = require('./models/recipe');

var mainRoutes = require('./routes/index');
var mainApiRoutes = require('./routes/api');
var visualgasRoutes = require('./routes/visualgas/index');
var visualgasApiRoutes = require('./routes/visualgas/api');
var gw2ApiRoutes = require('./routes/gw2/api');
var mongoose = require('mongoose');
var credentials = require('./config/credentials.js');
var passport = require('passport');
var session = require('express-session');
var flash = require('connect-flash');

//add timestamps in front of log messages
require('console-stamp')(console, '[HH:MM:ss.l]');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ secret: 'anthonydressersecret' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./config/passport.js')(passport);

app.use('/', mainRoutes);
app.use('/gw2/api', gw2ApiRoutes);
app.use('/api', mainApiRoutes);
app.use('/visualgas', visualgasRoutes);
app.use('/visualgas/api', visualgasApiRoutes);

app.use('/*', function(req, res, next){
  res.render('template', { title : 'Anthony Dresser' })
})

var connect = function() {
  mongoose.connect(credentials.dburl);
};
connect();

//handle mongodb errors
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.on('disconnected', connect);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    console.log('error: ' + err);
    console.log('message: ' + err.message);
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  console.log('error: ' + err);
  console.log('message: ' + err.message);
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

//var recipeHolder = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
//request.get('https://api.guildwars2.com/v2/recipes', function(error, response, body){
//  processData(JSON.parse(body));
//});
//
//function processData(data){
//  var promiseArray = [];
//  console.log('Processing data');
//
//  data.forEach(function(recipe, index, array){
//    var deferred = Q.defer();
//    //if(recipe > x) {
//      if (promiseArray.length > 0) {
//        promiseArray[promiseArray.length - 1].then(function () {
//              var url = 'https://api.guildwars2.com/v2/recipes/' + recipe;
//              console.log('Starting recipe ', recipe);
//              request.get(url, function (error, response, body) {
//                if (error) {
//                  console.log('Error', error);
//                }
//                body = JSON.parse(body);
//                //if(body.disciplines.indexOf('Weaponsmith') > -1){
//                //  recipeHolder[Math.floor(body['min_rating']/25)].push(body);
//                //}
//                var entry = new Recipe(body);
//                entry.save(function (err) {
//                  if (err) {
//                    console.log('Error', err);
//                  }
//                  console.log('finished recipe ' + body.id);
//                  deferred.resolve();
//                })
//              });
//            }
//        )
//        promiseArray.push(deferred.promise);
//      } else {
//        var url = 'https://api.guildwars2.com/v2/recipes/' + recipe;
//        console.log('Starting recipe ', recipe);
//        request.get(url, function (error, response, body) {
//          if (error) {
//            console.log('Error', error);
//          }
//          body = JSON.parse(body);
//          //if(body.disciplines.indexOf('Weaponsmith') > -1){
//          //  recipeHolder[Math.floor(body['min_rating']/25)].push(body);
//          //}
//          var entry = new Recipe(body);
//          entry.save(function (err) {
//            if (err) {
//              console.log('Error', err);
//            }
//            console.log('finished recipe ' + body.id);
//            deferred.resolve();
//          })
//        })
//        promiseArray.push(deferred.promise);
//      }
//    //}
//  })
//}



module.exports = app;
