const { userModel } = require("../model/database");

module.exports = {
  ensureAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      console.log("ensured logged in");
      return next();
    }
    console.log("not ensured logged in");
    return res.redirect("/login");
  },
  forwardAuthenticated: (req, res, next) => {
    if (!req.isAuthenticated()) {
      return next();
    }
    return res.redirect("/reminders");
  },
  isAdmin: (req, res, next) => {
    if (req.user.role == "admin") {
      return res.redirect("auth/admin");
    }
    return next();
  },
  forwardAdmin: (req, res, next) => {
    // only let admin to go forward
    if (req.user.role == "admin") {
      return next();
    }
    // not admin
    return res.redirect("/reminders");
  }
};