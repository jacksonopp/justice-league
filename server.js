// imports
const express = require("express");
const passport = require("passport");
const session = require("express-session");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const exphb = require("express-handlebars");

// models
const db = require("./models");

// sync database
db.sequelize
  .sync()
  .then(() => {
    console.log("looks good");
  })
  .catch(err => {
    console.log(err, "something went wrong");
  });

//set up the app
const app = express();
const PORT = process.env.PORT || 3000;
// middleware
app.use(express.static("public"));
// for bodyparser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// for passport
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
); // session secret
app.use(passport.initialize());
app.use(passport.session());

// handlebars
app.engine("handlebars", exphb({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// routes
require("./routes/apiRoutes")(app, passport);
require("./routes/htmlRoutes")(app, passport);

//load passport strategies
require("./config/passport")(passport, db.User);

app.listen(PORT, function(err) {
  if (!err) console.log("Site is live on http://localhost:" + PORT);
  else console.log(err);
});
