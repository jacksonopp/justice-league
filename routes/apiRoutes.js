var db = require("../models");

module.exports = function(app, passport) {
  app.get("/api/users", async function(req, res) {
    const users = await db.User.findAll({});
    res.json(users);
  });
};
