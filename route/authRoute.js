const express = require("express");
const passport = require("../middleware/passport");
const authUser = require("../controller/auth_controller");

const {
  ensureAuthenticated,
  forwardAuthenticated,
  forwardAdmin
} = require("../middleware/checkAuth");

const router = express.Router();

router.get("/login", forwardAuthenticated, (req, res) => {
  console.log(req.flash());
  res.render("auth/login", {
    showNavBar: "no",
  });
});

router.get("/admin", [ensureAuthenticated, forwardAdmin], (req, res) => {
  console.log(req.flash());
  authUser.listLoggedInUsers(req, res);
});

router.get("/destroySession/:sID", [ensureAuthenticated, forwardAdmin], (req, res) => {
  authUser.destroyUserWithSID(req, res);
});

router.get("/myprofile", ensureAuthenticated, (req, res) => {
  authUser.userDetails(req, res);
});

router.get("/profileImage", ensureAuthenticated, (req, res) => {
  authUser.changeProfileImg(req, res);
});

router.post("/profileImage", ensureAuthenticated, async (req, res) => {
  await authUser.replaceProfileImg(req, res);
  // redirect back to my profile page
  //res.redirect("/auth/myprofile");
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