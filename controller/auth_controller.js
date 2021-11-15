let database = require("../model/database");

let authController = {
  login: (req, res) => {
    if (forwardAuthenticated) {
      res.render("/reminders");
    } else {
      res.render("auth/login");
    }
  },

  register: (req, res) => {
    res.render("auth/register");
  },

  loginSubmit: (req, res) => {
    // implement
  },

  registerSubmit: (req, res) => {
    // implement
  },
};

module.exports = authController;