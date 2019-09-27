var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("index", {
      msg: "Welcome!"
    });
  });

  app.get("/questionaire", function(req, res) {
    res.render("questionaire", {
      msg: "Welcome!"
    });
  });

  // Load example page and pass in an example by id
  app.get("/matches/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.render("matches", {
        example: dbExample
      });
    });
  });

  // Browse all possible matches
  app.get("/browse", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("browse", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  //testing auth0
  app.get("/authorized", function(req, res) {
    res.send("Secured Resource");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
