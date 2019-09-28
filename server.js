require("dotenv").config();
const express = require("express"); // server framework
const passport = require("passport"); // authentication framework
const session = require("express-session"); // session logging framework
const bodyParser = require("body-parser"); // body parser to make reqs easier
const exphbs = require("express-handlebars");

//models
const db = require("./models");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static("public"));
// for bodyparser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// for passport
app.use(
  session({ secret: "traffic light", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());
// Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

const syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
