let database = require("../model/database");
const passport = require("../middleware/passport");

let authController = {
  // login: (req, res) => {
  //   if (forwardAuthenticated) {
  //     res.render("/reminders");
  //   } else {
  //     res.render("auth/login");
  //   }
  // },

  // register: (req, res) => {
  //   res.render("auth/register");
  // },

  // loginSubmit: (req, res) => {
  //   // implement
  // },

  // registerSubmit: (req, res) => {
  //   // implement
  // },

  listLoggedInUsers: (req, res) => {
    req.sessionStore.all((err, sessions) => {
      if (err) console.log(err);
      console.log(sessions);
      res.render("auth/admin", {
        activeSessions: (Object.keys(sessions))
      });
    });
  },
};

module.exports = authController;