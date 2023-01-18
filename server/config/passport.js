const localStrategy = require("passport-local").Strategy;
const User = require("../model/user");
const bcrypt = require("bcrypt");

module.exports = (passport) => {
  passport.use(
    new localStrategy(async (username, password, done) => {
      let query = { username };
      const user = await User.findOne(query);
      if (!user) {
        return done(null, false, { message: "No user found" });
      }
      // Match password
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Wrong password" });
      }
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
