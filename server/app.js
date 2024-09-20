var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('./config/config');

const models = require('./models');
const passport = require('passport');
// const indexRouter = require('./routes/v1');
const cryptoService = require('./services/crypto.service.js');
const {to} = require('./global_functions.js');
var app = express();
var cors = require('cors')






// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// require('./swagger');
app.use(passport.initialize());
const corsOptions = {
  origin: 'http://localhost:3000',  // Allow the frontend origin
  credentials: true  // Allow credentials (cookies, authorization headers, etc.)
};
app.use(cors(corsOptions))
models.sequelize.authenticate().then(()=>{
  console.log('connected to db',CONFIG.db_name);
}).catch((err)=>{
  console.log('not connected to db',err.message);
});
models.sequelize.sync({alter:true});
console.log('environment', CONFIG.environment,"port",CONFIG.port);
app.use(async function (req,res,next){
  if(req && req.headers && req.headers.authorization){
    [err,data] = await to(cryptoService.decrypt(req.headers.authorization));
    req.headers.authorization =  data;
    console.log('check123',req.headers.authorization);
  }
  next();
});
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  // Request methods you wish to allow
  res.setHeader("Access-Control-Allow-Methods", "GET, POST,PUT, , OPTIONS");
  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With, content-type, Authorization, Content-Type"
  );
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);
  // Disable option for catch the response
  res.setHeader("Cache-Control", "no-cache ,no-store");
  // Pass to next layer of middleware
  next();
});

app.use("/healthcheck", require("express-healthcheck")());
app.use('/v1/user',require('./controllers/user/user.controller').router);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// 
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
