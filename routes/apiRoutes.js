var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", async function(req, res) {
    db.Example.create(req.body);
    res.json(dbExample);
  });
  // use try and to get await to work with asynch

  // Delete an example by id
  app.delete("/api/examples/:id", async function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } });
  });
};
