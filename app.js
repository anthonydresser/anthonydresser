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
var session = require('express-session')({ secret: 'anthonydressersecret', resave: true, saveUninitialized: true });
var flash = require('connect-flash');
var sharedsession = require('express-socket.io-session');

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
io.use(sharedsession(session));
io.on('connection', function(socket){
    console.log("connected");
    socket.emit("greetings", {msg:"hello"});
    socket.on("something", function(data){
        console.log("client["+socket.handshake.session.myCustomData.userID+"] sent data: " + data);
        var chess = new PythonShell('../resources/connect4.py');

        chess.on('message', function(message){
            console.log('message', message);
            socket.emit("move", {msg:message});
        })

        chess.end(function(err){
            if(err) throw err;
            socket.emit('greetings', {msg:'finished'});
        })
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
