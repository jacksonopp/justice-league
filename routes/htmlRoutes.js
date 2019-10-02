const db = require("../models");
const moment = require("moment");

module.exports = function(app, passport) {
  app.get("/", function(req, res) {
    res.render("index");
  });

  //sign in
  app.post(
    "/",
    passport.authenticate("local-signin", {
      successRedirect: "/dashboardLink",
      failureRedirect: "/signinFailed"
    })
  );

  // signin failed, redirect to root
  app.get("/signinFailed", function(req, res) {
    res.send("/");
  });

  // sign in succeed, redirect to dashboard
  app.get("/dashboardLink", function(req, res) {
    res.send("/dashboard");
  });

  //renders the dashboard page
  app.get("/dashboard", isLoggedIn, async function(req, res) {
    // send the last time the user logged in
    const lastLogin = await db.User.update(
      { last_login: moment().format() },
      {
        where: {
          // comes from passport
          id: req.user.id
        }
      }
    );
    // render the dashboard page
    res.render("dashboard", {
      username: req.user.username,
      last_login: req.user.last_login
    });
    console.log(req.user);
  });

  //ends the session
  app.get("/logout", function(req, res) {
    req.session.destroy(function(err) {
      res.redirect("/");
    });
  });

  // render the questionaire page (signup)
  app.get("/questionaire", function(req, res) {
    res.render("questionaire", {
      msg: "Welcome!"
    });
  });

  //post request to sign up (adds new user securely)
  app.post(
    "/questionaire",
    passport.authenticate("local-signup", {
      //if it worked, go to dashboard
      successRedirect: "/questionaireLink",
      // if it didnt work
      failureRedirect: "/signupFailed"
    })
  );

  app.put("/questionaire2", async function(req, res) {
    console.log(req.body);
    const userID = await req.user.id;
    console.log(userID);
    const user = await db.User.update(
      {
        car_model: req.body.car_model,
        image: req.body.img,
        city: req.body.city,
        about: req.body.about
      },
      {
        where: {
          id: userID
        }
      }
    );
    res.send("connected");
  });

  app.get("/questionaireLink", function(req, res) {
    res.send("/questionaire2");
  });

  app.get("/questionaire2", isLoggedIn, function(req, res) {
    res.render("questionaire2");
  });

  // on failure, redirect to questionaire to try again
  app.get("/signupFailed", function(req, res) {
    res.render("/questionaire");
  });

  app.get("/matches", async function(req, res) {
    //get data and int
    res.render("matches");
  });

  // Browse all possible matches
  app.get("/browse", isLoggedIn, function(req, res) {
    res.render("browse");
  });

  app.get("/test", isLoggedIn, function(req, res) {
    res.render("test");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });

  //checking for logged in middleware
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/");
  }
};
