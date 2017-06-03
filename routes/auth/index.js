var express = require('express');
var passport = require('passport');

var mongoose = require('mongoose');
var User = mongoose.model('User');
var auth = require('./auth.service');

require('./login/passport').setup(User);

var router = express.Router();

router.use('/login', require('./login'));

module.exports = router;