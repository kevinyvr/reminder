const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const userController = require("../controller/userController");
const GitHubStrategy = require('passport-github').Strategy;
const dotenv = require('dotenv');

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENTID,
    clientSecret: process.env.GITHUB_CLIENTSECRET,
    callbackURL: `http://localhost:${process.env.PORT}/auth/github/callback`
  },
  function (accessToken, refreshToken, profile, done) {
    console.log("Github logged in. Now finding your record in the reminder system.");
    // User.findGithubIDOrCreate({ githubId: profile.id }, function (err, user) {
    //   return done(null, user);
    // });
    let user = userController.findGithubIDOrCreate(profile);
    console.log(user);
    return done(null, user);
  }
));


const localLogin = new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
  },
  (email, password, done) => {
    const user = userController.getUserByEmailIdAndPassword(email, password);
    return user ?
      done(null, user) :
      done(null, false, {
        message: "Your login details are not valid. Please try again",
      });
  }
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  let user = userController.getUserById(id);
  if (user) {
    done(null, user);
  } else {
    done({
      message: "User not found"
    }, null);
  }
});

module.exports = passport.use(localLogin);