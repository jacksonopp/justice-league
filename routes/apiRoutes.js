var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/all", async function(req, res) {
    try {
      const users = await db.PrivateTables.findAll({});
      res.json(users);
      console.log(users);
    } catch (error) {
      console.log(error);
    }
  });

  // Create a new example  -- use async await
  app.post("/api/examples", async function(req, res) {
    try {
      const user = await db.PrivateTables.create(req.body);
      console.log(user);
    } catch (error) {
      errorResult(error);
    }
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.PrivateTables.destroy({ where: { id: req.params.id } }).then(function(
      PrivateTables
    ) {
      res.json(PrivateTables);
    });
  });
};
