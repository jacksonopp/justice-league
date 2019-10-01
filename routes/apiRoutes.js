var db = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports = function(app, passport) {
  // Get all examples
  app.get("/api/all", async function(req, res) {
    try {
      const users = await db.User.findAll({});
      res.json(users);
      console.log(users);
    } catch (error) {
      console.log(error);
    }
  });

  //get all users for the browse page
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
    // keeps track of wether or not the user said yes or no on another user
    const yesOrNo = await req.params.yesOrNo;
    try {
      // checks if the other person said yes
      // this is if the user previously said no, then changed their answer
      const matches = await db.Matches.findAll({
        where: {
          user2: req.user.id,
          user1: req.body.id,
          yes_or_no: true
        }
      });
      console.log("matches:", matches.length);
      // this checks whether the user has previously voted on their potential match
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
          // this is the case where the user previously said no and then switched their answer

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
            // if this is the first time the user has voted
            if (exists.length === 0) {
              // create a new entry
              await db.Matches.create({
                user1: req.user.id,
                user2: req.body.id,
                yes_or_no: req.body.yesOrNo,
                complete: true
              });
              // if this is NOT the first time the user has voted
            } else {
              // update the existing entry
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
            // if there is no match, but user has voted before
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
            // if there is no match and the user hasn't voted before
          } else {
            //create a new entry
            const newEntry = await db.Matches.create({
              user1: req.user.id,
              user2: req.body.id,
              yes_or_no: req.body.yesOrNo
            });
            res.send(newEntry);
          }
        //if the user votes no
        case "false":
          // if the user has voted before
          if (exists.length !== 0) {
            // update their answer with the new answer
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
            // if the user hasn't voted before
          } else {
            //make a new entry
            const newEntry = await db.Matches.create({
              user1: req.user.id,
              user2: req.body.id,
              yes_or_no: req.body.yesOrNo
            });
            res.send(newEntry);
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

      for (i = 0; i < user2.length; i++) {
        console.log(user2[i].user1 + ", ");
      }

      //update db.Matches where user1 && user2 are matches
    } catch (error) {
      console.log(error);
    }
  });

  //get request to show all people that are not the user

  app.get("/api/findnewfriends/:userid", async function(req, res) {
    try {
      const newFriends = await db.User.findAll({
        where: { id: { [Op.ne]: req.params.userid } }
      });
      res.json(newFriends);
      console.log(newFriends);
    } catch (error) {
      console.log(error);
    }
  });
};
