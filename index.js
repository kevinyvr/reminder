const express = require("express");
const app = express();
const path = require("path");
const ejsLayouts = require("express-ejs-layouts");
const dotenv = require('dotenv');
dotenv.config();


// set these before using passport initialize, session and redis store
const session = require("express-session");
const sessionStore = session.MemoryStore;

// using memorystore as session store

app.use(
  session({
    // store: sessionStore,
    store: new sessionStore(),
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

const flash = require('connect-flash');
app.use(flash());

// const authController = require("./controller/auth_controller");


const passport = require("./middleware/passport");
const reminderRoute = require("./route/reminderRoute");
const authRoute = require("./route/authRoute");
const indexRoute = require("./route/indexRoute");

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({
  extended: false
}));
app.use(ejsLayouts);

app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "ejs");


// Routes start here
// app.get("/reminders", reminderController.list);
// app.get("/reminder/new", reminderController.new);
// app.get("/reminder/:id", reminderController.listOne);
// app.get("/reminder/:id/edit", reminderController.edit);

// app.post("/reminder/", reminderController.create);
// // Implement this yourself
// app.post("/reminder/update/:id", reminderController.update);
// app.post("/reminder/delete/:id", reminderController.delete);

// Fix this to work with passport! The registration does not need to work, you can use the fake database for this.
// app.get("/register", authController.register);
// app.get("/login", authController.login);
// app.post("/register", authController.registerSubmit);
// app.post("/login", authController.loginSubmit);

// opt for authRoute and indexRoute instead
app.use("/reminder", reminderRoute);
app.use("/auth", authRoute);
app.use("/", indexRoute);

app.listen(process.env.PORT, function () {
  console.log(
    `Server running. Visit: localhost:${process.env.PORT}/reminders in your browser 🚀`
  );
});