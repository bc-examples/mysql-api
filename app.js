var express = require('express');
//var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const dotenv=require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();
const path = require('path');

var indexRouter = require('./routes/index');
var bookRouter = require('./routes/book');
var userRouter = require('./routes/user');
var loginRouter = require('./routes/login');
var borrowsRouter = require('./routes/borrows');
var userdetailsRouter = require('./routes/user_details');

var app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());
app.use(cors());


var app = express();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(cors());
app.use(helmet());
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//suojaamattomat reitit
app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/userdetails', userdetailsRouter);

app.use(authenticateToken);
//suojatut reitit
app.use('/book', bookRouter);
app.use('/user', userRouter);
app.use('/borrows', borrowsRouter);


function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    console.log("token = "+token);
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.MY_TOKEN, (err, user) => {
      console.log(err)
  
      if (err) return res.sendStatus(403)
  
      req.user = user
  
      next()
    })
  }


module.exports = app;
