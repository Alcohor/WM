var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var admin = require('./routes/admin')
var auth = require('./routes/auth')
var usersRouter = require('./routes/users');
var movies = require('./routes/movies');
var shop = require('./routes/shop')
var food =  require('./routes/foods')
// var order = require('./routes/order.js')
var active = require('./routes/active')
var session = require('express-session')

var mAdmin = require('./routes/mAdmin')

var app = express();

// import express from 'express'

var http = require('http').Server(app);;
// var server = http.createServer(function (req, res) {
// }).listen(9091);//创建http服务
console.log('Server running ');
var io=require('socket.io')(http);
// var io = require('socket.io').listen(server);
io.on('connection', (socket) => {
    
    socket.on('order', data => {
      console.log(data)
      socket.emit('push', data);
    });   
});

http.listen(9091, function(){
  console.log('listening on *:9091');
});


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(session({
  secret: 'cat',
  resave: false,
  saveUninitialized: true,
  cookie: {  httpOnly: false, secure: false, maxAge: 1000 * 60 * 5 }
}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(function (req, res, next) {
//   req.cookies = cookieParser.parse(req.headers.cookie);
//   next();
// });


app.use('/', indexRouter);
app.use('/api/admin', admin)
app.use('/api/auth', auth)
app.use('/api/users', usersRouter);
app.use('/api/shop', shop)
app.use('/api/movies', movies)
app.use('/api/active', active)
app.use('/api/foods', food)

app.use('/m/api/admin', mAdmin)
// app.use('/api/order', order)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

module.exports = {
  app,
  io
}

