'use strict';

const express = require('express');
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

// Routes
const authRoute = require('../routes/auth');
const profileRoute = require('../routes/profile');
const dashboardRoute = require('../routes/dashboard');
const instructorsRoute = require('../routes/instructors');
const academyRoute = require('../routes/academy');

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
app.use(express.static(path.join(__dirname + '/public')));
app.use(bodyParser.urlencoded({ extended: true }));

// Passport

app.use(passport.initialize());
app.use(passport.session());

// Middleware Routes
app.use('/auth', authRoute);
app.use('/profile', profileRoute);
app.use('/dashboard', dashboardRoute);
app.use('/instructors', instructorsRoute);
app.use('/academy', academyRoute);

app.get('/', (req, res) => {
    res.render('home', {
        user: req.user
    });
});

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

module.exports = app;
module.exports.handler = serverless(app);
