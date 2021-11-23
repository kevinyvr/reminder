const express = require("express");
const router = express.Router();
const reminderController = require("../controller/reminder_controller");

const passport = require("passport");
const userController = require("../controller/userController");

const {
  ensureAuthenticated,
  isAdmin
} = require("../middleware/checkAuth");

router.get("/", (req, res) => {
  res.redirect("/index.html");
});

// router.get("/dashboard", ensureAuthenticated, (req, res) => {
//   res.render("dashboard", {
//     user: req.user,
//   });
// });

router.get("/login", (req, res) => res.redirect("auth/login"));

router.get("/reminders", [ensureAuthenticated, isAdmin], (req, res) => {
  console.log(req.flash());
  reminderController.list(req, res);
});


module.exports = router;