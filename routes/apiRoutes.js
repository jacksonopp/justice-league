var db = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports = function(app, passport) {
  //get all users
  app.get("/api/users", async function(req, res) {
    const body = await { currentUser: req.user.id };
    const userArr = [];
    const matches = await db.Matches.findAll({
      where: {
        user1: {
          [Op.ne]: req.user.id
        }
        // complete: false
      }
    });
    body.matches = matches;
    matches.forEach(user => {
      userArr.push(user.dataValues.user1);
    });
    const usersUniqueArr = userArr.filter((elem, index, self) => {
      return index === self.indexOf(elem);
    });

    const usersToSend = await db.User.findAll({
      where: {
        id: usersUniqueArr
      }
    });
    console.log(usersToSend);
    res.send(usersToSend);
  });

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

  app.post("/api/private", async function(req, res) {
    try {
      const userCheck = await db.PrivateTables.findAll({
        where: {
          email: req.body.email
        }
      });
      if (userCheck.length < 1) {
        const newUser = await db.PrivateTables.create({
          email: req.body.email,
          img_url: req.body.imageUrl,
          user_full_name: req.body.name
        });
        res.send({ redirectURL: "/questionaire" });
        console.log("created a new user");
      } else {
        res.send({ redirectURL: "www.google.com" });
        console.log("did not create a new user");
      }
      // res.json(userCheck)
    } catch (error) {
      res.send(error);
      console.log(error);
    }
  });

  // Get matches for user1
  app.get("/api/matches/:user1", async function(req, res) {
    try {
      //check to see if current user (user1) says yes to anyone
      const idOfUser1 = req.params.user1;
      const user1 = await db.Matches.findAll({
        where: { user1: req.params.user1 }
      });
      console.log(user1);

      //take user1 match data and see if the other users feel the same way about user1
      const user2 = await db.Matches.findAll({ where: { user2: idOfUser1 } });
      res.json(user2);
      console.log(user2);

      console.log(
        "User with the ID of " + idOfUser1 + " matched with users with ID of "
      );
      const array = user2;

      for (i = 0; i < array.length; i++) {
        console.log(array[i].user1 + ", ");
      }
    } catch (error) {
      console.log(error);
    }
  });
};
