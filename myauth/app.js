var express = require('express');
var debug = require('debug')('myauth:server');
var http = require('http');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var mongo = require('mongodb');
var session = require('express-session');
var expressValidator = require('express-validator');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var util = require('util');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cms');
var db = mongoose.connection;
var User = require('./models/user');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();


/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

var io = require('socket.io')(server);

var people = {}

io.on('connection', function (socket) {
	socket.on("join", function(name){
        people[socket.id] = name;
        socket.emit("update", "You have connected to the server.");
        io.sockets.emit("update", name + " has joined the server.")
        io.sockets.emit("update-people", people);
    });
	console.log("user connected");
    socket.on('disconnect', function(){
    	io.sockets.emit("update", people[socket.id] + " has left the server.");
        delete people[socket.id];
        io.sockets.emit("update-people", people);
  });
    socket.on('chat message', function(msg){
      	io.sockets.emit('chat message', people[socket.id], msg);
  });
 
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//handle Express session
app.use(session({
	secret:'secret',
	saveUninitialized:true,
	resave:true
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

//flash
app.use(flash());

// Global varibles
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;  
  next();
});


app.use('/', index);
app.use('/users', users);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;




/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

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