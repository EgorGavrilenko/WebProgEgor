const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const db = require("./config/db");
const User = require("./config/PasswordsSchema");

passport.use(new LocalStrategy((ausername, apassword, done) => {
  User.findOne({ username: ausername }, (err, user) => {
    if (err) done(null, false);
    if (user) {
      if (bcrypt.compareSync(apassword, user.password)) done(null, user);
      else done(null, false);
    } else {
      done(null, false);
    }
  });
}));

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = passport;
