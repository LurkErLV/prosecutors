'use strict';

const express = require('express');
const http = require('http');
const https = require('https');
const { port, ip } = require('../config.json');
const app = express();
const session = require('express-session');
const passport = require('passport');
const discordStrategy = require('../strategies/discordstrategy');
const db = require('../database/database');
const path = require('path');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const Logs = require('../models/Logs');
const compression = require('compression')
const serverless = require('serverless-http');
const router = express.Router();

db.then(() => console.log('Connected to MongoDB')).catch(err => console.log(err));

const httpServer = http.createServer(app);

// Routes
const homeRoute = require('../routes/home');
const authRoute = require('../routes/auth');
const profileRoute = require('../routes/profile');
const dashboardRoute = require('../routes/dashboard');
const prosecutorsRoute = require('../routes/prosecutors');
const ordersRoute = require('../routes/orders');
const newsRoute = require('../routes/news');
const errorRoute = require('../routes/error');

app.use(session({
  secret: '228secret1337',
  cookie: {
      maxAge: 14400000
  },
  saveUninitialized: false,
  name: 'discord.oauth2'
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));
app.use(express.static(path.join(__dirname + '/../public')));
app.use(bodyParser.urlencoded({ extended: true }));

// Passport

app.use(passport.initialize());
app.use(passport.session());

// Middleware Routes
app.use('/', homeRoute);
app.use('/auth', authRoute);
app.use('/profile', profileRoute);
app.use('/dashboard', dashboardRoute);
app.use('/prosecutors', prosecutorsRoute)
app.use('/orders', ordersRoute);
app.use('/news', newsRoute);
app.use('*', errorRoute);

httpServer.listen(8080);