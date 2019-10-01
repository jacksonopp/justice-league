var db = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports = function(app, passport) {
  //get all users for the browse
  try {
    app.get("/api/users", async function(req, res) {
      // set up an array to save matches
      const matchArr = [];
      // find all other users that the current user matched with
      const matches = await db.Matches.findAll({
        where: {
          // completed happened
          complete: true,
          // for the current user
          user1: req.user.id
        }
      });

      //push all matches to matchArr
      matches.forEach(user => {
        matchArr.push(user.dataValues.user2);
      });
      //push the current user to matchArr
      matchArr.push(req.user.id);
      console.log("matchArr:", matchArr);

      // this is the array of users to send
      const usersToSend = await db.User.findAll({
        where: {
          id: {
            [Op.notIn]: matchArr
          }
        }
      });
      res.json(usersToSend);
    });
  } catch (error) {
    console.log(error);
  }

  app.post("/api/matches/:yesOrNo", async function(req, res) {
    const yesOrNo = await req.params.yesOrNo;
    try {
      const matches = await db.Matches.findAll({
        where: {
          user2: req.user.id,
          user1: req.body.id,
          yes_or_no: true
        }
      });
      console.log("matches:", matches.length);
      const exists = await db.Matches.findAll({
        where: {
          user1: req.user.id,
          user2: req.body.id
        }
      });
      console.log("exists:", exists.length);
      // switch case
      switch (yesOrNo) {
        case "true":
          console.log(req.body.id);
          //find out if there are matches
          // if there is a match
          if (matches.length !== 0) {
            // update the other one's complete to true
            await db.Matches.update(
              { complete: true },
              {
                where: {
                  user2: req.user.id,
                  user1: req.body.id
                }
              }
            );
            // if does not exists
            if (exists.length === 0) {
              // create a new entry
              await db.Matches.create({
                user1: req.user.id,
                user2: req.body.id,
                yes_or_no: req.body.yesOrNo,
                complete: true
              });
              // if it does exist
            } else {
              //update the existing entry
              await db.Matches.update(
                {
                  user1: req.user.id,
                  user2: req.body.id,
                  yes_or_no: req.body.yesOrNo,
                  complete: true
                },
                {
                  where: {
                    user1: req.user.id,
                    user2: req.body.id
                  }
                }
              );
            }
            res.send(matches);
            // if there is no match, but the entry does exist
          } else if (exists.length !== 0) {
            //update the existing entry
            const updateEntry = await db.Matches.update(
              {
                user1: req.user.id,
                user2: req.body.id,
                yes_or_no: req.body.yesOrNo
              },
              {
                where: {
                  user1: req.user.id,
                  user2: req.body.id
                }
              }
            );
            res.send(updateEntry);
            // if there is no match and the entry does not exist
          } else {
            //create a new entry
            const newEntry = await db.Matches.create({
              user1: req.user.id,
              user2: req.body.id,
              yes_or_no: req.body.yesOrNo
            });
            res.send(newEntry);
          }
        case "false":
          if (exists.length !== 0) {
            const updateEntry = await db.Matches.update(
              {
                user1: req.user.id,
                user2: req.body.id,
                yes_or_no: req.body.yesOrNo
              },
              {
                where: {
                  user1: req.user.id,
                  user2: req.body.id
                }
              }
            );
            res.send(updateEntry);
          } else {
            const newEntry = await db.Matches.create({
              user1: req.user.id,
              user2: req.body.id,
              yes_or_no: req.body.yesOrNo
            });
          }
      }
      // console.log(matches);
    } catch (error) {
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
