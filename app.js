var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');

var api = require('./routes/api');

http.IncomingMessage.prototype.ensureParam = function(name, type, optional)
{
  var val = this.param(name);
  if (!optional && (val === null || val === undefined || val === "")) throw "Non-optional paramater '"+name+"' is missing";
  if (type && val != null)
  {
    var t = type.toLowerCase();
    if (t == "array")
    {
      if (!Array.isArray(val)) throw "Paramater '"+name+"' is expected to be of type Array";
    }
    else
    if (typeof val != t) throw "Parameter '"+name+"' is expected to be of type "+type;
  }
  return val;
}

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api', api);

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
    res.status(err.status || 500);
    res.send({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: {}
  });
});


module.exports = app;
