'use strict'

const express = require('express');
const UserController = require('../controllers/user');

const api = express.Router();

api.get('/home', UserController.home);
api.get('/tests', UserController.tests);
api.post('/register', UserController.saveUser);

module.exports = api;