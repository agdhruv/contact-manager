var express = require('express');
var mongoose = require('mongoose');
var session = require('express-session');
var router = express.Router();

var login = require('./Models/login.js');
var user = require('./Models/user.js');


module.exports = router;