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
var flash = require('connect-flash');
//var sharedsession = require('express-socket.io-session');
//var redis = require("redis"),
//    client = redis.createClient(credentials.redisURL, {no_ready_check: true});
//var RedisStore = require('connect-redis')(express);
//var sessionStore = new RedisStore({ client: client});
var session = require('express-session')({ secret: 'anthonydressersecret', resave: true, saveUninitialized: true });

var PythonShell = require('python-shell');

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

app.use(session);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./config/passport.js')(passport);

app.use('/', function(req, res, next){
    console.log('added sessions');
    req.session.myCustomData = {msg:"add something you need to session, like userID", userID:Math.floor(Math.random()*100)};
    next();
});

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


var debug = require('debug')('anthonydresser:server');
var http = require('http');

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

io = require('socket.io').listen(server);
var redissess = require('socket.io-redis');
var redis = require('redis');
var client = redis.createClient(credentials.redisURL, {no_ready_check: true});
io.adapter(redissess({pubClient:client, subClient:client}));
io.on('connection', function(socket){
    var chess;
    var playersTurn = 0;
    console.log("connected");
    socket.on('setup', function(data){
        var argNum = 0;
        console.log('data received', data);
        chess = new PythonShell('../resources/connect4.py');
        chess.on('message', function(message){
            if(argNum < 6) {
                switch (argNum) {
                    case 0:
                        if (data.options == 'player') {
                            chess.send('human');
                        } else {
                            chess.send('cpu');
                        }
                        argNum++;
                    case 1:
                        chess.send(data.winLength);
                        argNum++;
                    case 2:
                        chess.send(data.y);
                        argNum++;
                    case 3:
                        chess.send(data.x);
                        argNum++;
                    case 4:
                        chess.send(data.aiTime);
                        argNum++;
                    case 5:
                        chess.send(data.aiV);
                        argNum++;
                    case 6:
                        socket.emit('setup', {done: 1, x: data.x, y: data.y});
                        playersTurn = 1;
                        argNum++;
                }
            } else if(message.indexOf('Adding checker') > -1){
                socket.emit('move', {msg:message});
                if(message.indexOf('BLACK') > -1){
                    playersTurn = 1;
                }
            } else if(message.indexOf('won') > -1){
                socket.emit('finished');
            } else {
                socket.emit('message', message);
            }
        })
    });

    socket.on('disconnect', function(){
        chess.end(function(err){
        })
    })

    socket.on('move', function(data){
        if(playersTurn){
            playersTurn = 0;
            chess.send(data.x.toString());
        }
    })
});

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}
