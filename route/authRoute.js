const express = require("express");
const passport = require("../middleware/passport");
const {
  forwardAuthenticated
} = require("../middleware/checkAuth");

const router = express.Router();

router.get("/login", forwardAuthenticated, (req, res) => {
  console.log(req.flash());
  res.render("auth/login")
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/reminders",
    failureRedirect: "/login",
    failureFlash: true,
    successFlash: true,
  })
);

router.get(
  "/github",
  passport.authenticate("github")
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
});

router.get("/github/callback",
  passport.authenticate("github"),
  (req, res) => {
    res.redirect("/reminders");
  }
)

module.exports = router;