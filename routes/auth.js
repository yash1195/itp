var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/google', passport.authenticate('google', { scope: ['email'] }));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/login-failed'}),
  function(req, res, next) {
    res.send({
      data: {},
      msg: 'logged in',
      statusCode: 100
    });
});

router.get('/auth/login-failed', function(req, res, next) {
  res.send({
    data: {},
    msg: 'log in attempt failed',
    statusCode: 101
  });
});

module.exports = router;
