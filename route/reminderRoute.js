const express = require("express");
const passport = require("../middleware/passport");
const reminderController = require("../controller/reminder_controller");
const {
    ensureAuthenticated, forwardAuthenticated
} = require("../middleware/checkAuth");

const router = express.Router();

// router.get("/logout", (req, res) => {
//   req.logout();
//   res.redirect("/auth/login");
// });

router.get("/new", ensureAuthenticated, (req, res) => {
    reminderController.new(req, res);
});
router.get("/:id", ensureAuthenticated, (req, res) => {
    reminderController.listOne(req, res);
});
router.get("/:id/edit", ensureAuthenticated, (req, res) => {
    reminderController.edit(req, res);
});

router.post("/", ensureAuthenticated, (req, res) => {
    reminderController.create(req, res);
});
// Implement this yourself
router.post("/update/:id", ensureAuthenticated, (req, res) => {
    reminderController.update(req, res);
});
router.post("/delete/:id", ensureAuthenticated, (req, res) => {
    reminderController.delete(req, res);
});

module.exports = router;