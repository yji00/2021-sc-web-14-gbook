/**************** Global ******************/
const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();
require('./modules/server-init')(app, 3000);
const session = require('express-session')

/**************** Middlewares ******************/
const { createError, error404, error500 } = require('./middlewares/error-mw');


/**************** Sessions ******************/
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

/**************** Views ******************/
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));
app.locals.pretty = true;

/**************** req.body ******************/
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/**************** Router: static ******************/
app.use('/', express.static(path.join(__dirname, './public')));
app.use('/uploads', express.static(path.join(__dirname, './storages')));

/**************** Router: dynamic ******************/
const gbookRouter = require('./routes/gbook-router');

app.use('/gbook', gbookRouter);


/**************** Router: error ******************/
app.use(error404);
app.use(error500);