/**
 * 1. 有分页
 * 2. 可以查询
 * 3. 点击分类可以切换文章
 * 4. 点击文章可以跳到百度贴吧对应的贴吧里
 */
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

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
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

var spawn = require('child_process').spawn;
var cronJob = require('cron').CronJob;
//30秒跑一次子进程
var job = new cronJob('*/30 * * * * *', function(){
  //创建一个子进程
  var child_process = spawn(process.execPath, ['../task/main.js']);
  //把子进程的标准输出的数据传递到祝进程 的标准输出
  child_process.stdout.pipe(process.stdout);
  //把子进程的错误输出的数据传递到祝进程的错误输出
  child_process.stderr.pipe(process.stderr);
});

job.start();


