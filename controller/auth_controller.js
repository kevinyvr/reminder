let database = require("../model/database");
const userModel = require("../model/database").userModel;

const passport = require("../middleware/passport");
const imgur = require("imgur");
const fs = require("fs");

const userController = require("../controller/userController");

let authController = {
  // login: (req, res) => {
  //   if (forwardAuthenticated) {
  //     res.render("/reminders");
  //   } else {
  //     res.render("auth/login");
  //   }
  // },

  // loginSubmit: (req, res) => {
  //   // implement
  // },

  register: (req, res) => {
    res.render("auth/register", {
      showNavBar: "no",
    });
  },

  registerSubmit: async (req, res) => {
    // implement
    let [user, existed] = await userController.findEmailOrCreate(req.body.email, req.body.name, req.body.password);

    if (existed) {
      // User existed, redirect back to register
      res.redirect("/register");
    } else {
      if ((user)) {
        // User created, log the user in
        req.login(user, (err) => {
          if (!err) {
            console.log(user);
            res.redirect('/reminders');
          } else {
            //handle 
            console.log("error logging in with nearly created user info")
          }
        });
      }
    }
  },

  listLoggedInUsers: (req, res) => {
    req.sessionStore.all((err, sessions) => {
      if (err) console.log(err);
      console.log(sessions);
      res.render("auth/admin", {
        activeSessions: (Object.keys(sessions)),
        userID: req.user.id,
        showNavBar: "admin",
      });
    });
  },

  destroyUserWithSID: (req, res) => {
    let sID = req.params.sID;
    console.log(sID);
    req.sessionStore.destroy(sID, (err, data) => {
      if (err) console.log(err);
      req.sessionStore.all((error, sessions) => {
        if (error) console.log(error);
        console.log(sessions);
        res.render("auth/admin", {
          activeSessions: (Object.keys(sessions)),
          showNavBar: "admin",
        });
      });
    });
  },

  userDetails: (req, res) => {
    res.render("auth/myprofile", {
      userID: req.user.id,
      userName: req.user.name,
      userEmail: req.user.email,
      userProfileURL: req.user.profileURL,
      showNavBar: "reminder",
    });
  },

  changeProfileImg: (req, res) => {
    res.render("auth/profileImage", {
      userID: req.user.id,
      userProfileURL: req.user.profileURL,
      showNavBar: "reminder",
    });
  },

  replaceProfileImg: async (req, res) => {
    const file = req.files[0];
    try {
      // upload image to temp folder
      const url = await imgur.uploadFile(`./uploads/${file.filename}`);
      res.json({ message: url.link });
      // delete temporary file
      fs.unlinkSync(`./uploads/${file.filename}`);

      // update profile image in databse
      userModel.updateProfileURL(req.user.id, url.link);
    } catch (error) {
      console.log("error", error);
    }
  }
};

module.exports = authController;