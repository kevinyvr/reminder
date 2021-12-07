const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const userController = require("../controller/userController");
const GitHubStrategy = require('passport-github').Strategy;

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENTID,
    clientSecret: process.env.GITHUB_CLIENTSECRET,
    callbackURL: `http://localhost:${process.env.PORT}/auth/github/callback`
  },
  function (accessToken, refreshToken, profile, done) {
    console.log("Github logged in. Now finding your record in the reminder system.");

    let user = userController.findGithubIDOrCreate(profile);
    console.log(user);
    return done(null, user);
  }
));


const localLogin = new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
  },
  async (email, password, done) => {
    const user = await userController.getUserByEmailIdAndPassword(email, password);
  
    return user ?
      done(null, user) :
      done(null, false, {
        message: "Your login details are not valid. Please try again",
      });
  }
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    let user = await userController.getUserById(id);
    console.log(user);
    if (user) {
      done(null, user);
    } else {
      done({
        message: "User not found"
      }, null);
    }
  }
  catch (err) {
    console.log(err);
  }
});

module.exports = passport.use(localLogin);