let Database = require("../model/database");

let remindersController = {
  list: (req, res) => {
    //console.log(req);
    res.render("reminder/index", {
      reminders: req.user.reminders
    });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = req.user.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", {
        reminderItem: searchResult
      });
    } else {
      res.render("reminder/index", {
        reminders: req.user.reminders
      });
    }
  },

  create: (req, res) => {
    let reminder = {
      id: req.user.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    req.user.reminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = req.user.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", {
      reminderItem: searchResult
    });
  },

  update: (req, res) => {
    // implement this code
    let reminderToFind = req.params.id;
    let modTitle = req.body.title;
    let modDesc = req.body.description;
    let modCompleted = (req.body.completed=='true')?true:false;

    let searchResult = req.user.reminders.findIndex(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      req.user.reminders[searchResult]["title"] = modTitle;
      req.user.reminders[searchResult]["description"] = modDesc;
      req.user.reminders[searchResult]["completed"] = modCompleted;
    }
    res.render("reminder/index", {
      reminders: req.user.reminders
    });
  },

  delete: (req, res) => {
    // Implement this code
    let reminderToFind = req.params.id;
    let searchResult = req.user.reminders.findIndex((reminder) => {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      req.user.reminders.splice(searchResult, 1);
    }
    res.render("reminder/index", {
      reminders: req.user.reminders
    });
  },
};

module.exports = remindersController;