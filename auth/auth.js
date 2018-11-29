// auth
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth2').Strategy;
var googleConfig = require('../config/googleConfig');


// Simple route middleware to ensure user is authenticated.
var ensureAuthenticated = function(req, res, next) {

  if (req.isAuthenticated()) {
    return next();
  }

  res.send({
    data: {
      msg: "authentication required"
    },
    statusCode: 403
  });

};

var initialize = function() {

  passport.use(new GoogleStrategy({
      clientID:     googleConfig.CLIENT_ID,
      clientSecret: googleConfig.CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
      passReqToCallback   : true
    }, function(request, accessToken, refreshToken, profile, done) {
      return done(null, profile);
    })
  );

  passport.serializeUser(function(user, done) {
    // done(null, user.id);
    console.log(user);
    done(null, user);
  });

  passport.deserializeUser(function(profile, done) {
    // Users.findById(obj, done);
    if (profile) {
      var user = profile;
      return done(null, user);
    }
    else {
      return done(null, false);
    }
  });
};


module.exports = {
  ensureAuthenticated: ensureAuthenticated,
  initialize: initialize
};