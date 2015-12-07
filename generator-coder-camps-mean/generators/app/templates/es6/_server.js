"use strict";
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}
let express = require('express');
let bodyParser = require('body-parser');
let helmet = require('helmet');
let session = require('express-session');
let mongoose = require('mongoose');
let passport = require('passport');
let morgan = require('morgan');
let compression = require('compression');

require('./models/Users');
require('./models/Connections');
require('./models/Interviews');
require('./config/passport');
mongoose.connect('mongodb://localhost/jobhunthelper-test');

let app = module.app = express();
let port = process.env.PORT || 3000;

app.set('views', './views');
app.engine('.html', require('ejs').renderFile);
app.use(express.static('./dist'));
app.use(express.static('./bower_components'));
app.use('/ngFacebook', express.static('./node_modules/ng-facebook'));
app.set('view engine', 'html');
app.set('view options', {
  layout: false
});

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(compression())

app.use(helmet.csp({
  defaultSrc: ["'self'"], //loading all content
  scriptSrc: ["'self'", '*.google-analytics.com', 'cdnjs.cloudflare.com', "'unsafe-inline'", "code.jquery.com", "ajax.googleapis.com", 'connect.facebook.net', 'api.twitter.com'],
  styleSrc: ["'self'", "'unsafe-inline'", 'fonts.googleapis.com', "ajax.googleapis.com", "cdnjs.cloudflare.com"],
  imgSrc: ["'self'", '*.google-analytics.com', 'data:', "www.facebook.com"],
  connectSrc: ["'self'", 'api.twitter.com'],
  fontSrc: ['fonts.gstatic.com'],
  objectSrc: [],
  mediaSrc: [],
  frameSrc: ["'self'", "static.ak.facebook.com", "s-static.ak.facebook.com", "www.facebook.com"]
}));

app.use(helmet.xssFilter());
app.use(helmet.xframe('deny'));
app.use(helmet.hidePoweredBy());
let nosniff = require('dont-sniff-mimetype');
app.use(nosniff());

if (process.env.NODE_ENV === 'development') {
      app.use(morgan('dev'));
}

app.get('/*', (req, res) => {
  res.render('index');
});

app.use((err, req, res, next) => {
  // console.log(err);
  res.type('application/json');
  if (typeof err === "object" && err.custom === true) {
    res.status(err.status || 500).send({
      err: err.err
    });
  } else {
    res.status(500).send();
  }
});

module.exports = app.listen(port, () => {
  console.log('Example app listening at http://localhost:' + port);
});
