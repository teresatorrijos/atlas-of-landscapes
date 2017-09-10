require('dotenv').config();
const express      = require('express');
const path         = require('path');
const favicon      = require('serve-favicon');
const logger       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const layouts      = require('express-ejs-layouts');
const mongoose     = require('mongoose');
const session         = require("express-session");
const passport        = require("passport");
const MongoStore = require('connect-mongo')(session);

require('./config/passport')(passport);
var cors = require('cors');

const urlDB = process.env.MONGO_URL;
console.log(`connecting to db: ${urlDB}`);

mongoose.connect(urlDB).then(() => {
  console.log(`connected!! to db: ${urlDB}`);
}).catch( e => console.log(e));

const app = express();

var whitelist = [
    'http://localhost:4200',
];

var corsOptions = {
    origin: function(origin, callback){
        var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
        callback(null, originIsWhitelisted);
    },
    credentials: true
};
app.use(cors(corsOptions));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// default value for title local
app.locals.title = 'Atlas of Landscapes';

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));
app.use(layouts);

app.use(session({
  secret: "passport-local-strategy",
  resave: true,
  saveUninitialized: true,
  cookie : { httpOnly: true, maxAge: 2419200000 },
  store: new MongoStore({
        mongooseConnection: mongoose.connection
    })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next)=>{
  res.locals.user = req.user;
  next();
});
require('./routes')(app);
// catch 404 and forward to error handler
app.all('/*', function(req, res) {
  res.sendfile(__dirname + '/public/index.html');
});
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
