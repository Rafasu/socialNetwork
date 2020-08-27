'use strict'

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

//Load Routes
const user_routes = require('./routes/user');

//Middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//CORS

// Routes
app.use('/api', user_routes);

// Exports
module.exports = app;