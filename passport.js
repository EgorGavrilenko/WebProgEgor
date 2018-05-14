const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const fs = require('fs');

let users = JSON.parse(fs.readFileSync('./server/data/passwords.json', 'utf8'));
let newUsers = [];
for (let i = 0; i < users.length; i++)
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(users[i]['password'], salt, function(err, hash) {
      let newUser = {
        username: users[i]['username'],
        password: hash,
      };
      newUsers.push(newUser);
    });
  });

passport.use(
  new LocalStrategy(function(username, password, done) {
    let user = newUsers.find(k => k.username === username);
    if (user === undefined) {
      done(null, false);
    }
    if (bcrypt.compareSync(password, user.password)) done(null, user);
    else done(null, false);
  })
);

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports = passport;
