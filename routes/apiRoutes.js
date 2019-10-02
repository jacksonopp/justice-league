var db = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports = function(app, passport) {
  //get all users for the browse page
  try {
    app.get("/api/users", isLoggedIn, async function(req, res) {
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

          // if there is a match -- i say yes, they say yes
          if (matches.length !== 0) {
            // they say yes
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
          }
          if (matches.length !== 0 && exists.length !== 0) {
            //if they say yes and i have voted before
            const updatedMatch = await db.Matches.update(
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
            res.json(updatedMatch);
          } else if (matches.length !== 0 && exists.length === 0) {
            //if they say yes and i havn't voted before
            const newMatch = await db.Matches.create({
              user1: req.user.id,
              user2: req.body.id,
              yes_or_no: req.body.yesOrNo,
              complete: true
            });
            res.json(newMatch);
          } else if (matches.length === 0 && exists.length !== 0) {
            // if they say no and i have voted before
            const updatedMatch = await db.Matches.update(
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
            res.json(updatedMatch);
          } else if (matches.length === 0 && exists.length === 0) {
            // if they say no and i havn't voted before
            const newMatch = await db.Matches.create({
              user1: req.user.id,
              user2: req.body.id,
              yes_or_no: req.body.yesOrNo
            });
            res.json(newMatch);
          }
          break;
        // if this is the first time the user has voted
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
          break;
        default:
          res.send("there was an error");
      }
      // console.log(matches);
    } catch (error) {
      console.log(error);
    }
  });

  // Get matches for user1
  app.get("/api/matches/", isLoggedIn, async function(req, res) {
    try {
      console.log("Req: " + req.user);
      //console.log(res);
      //console.log("req.user.id: " + req.user.id);

      //check to see if current user (user1) says yes to anyone
      const idOfUser1 = req.user.id;
      const user1 = await db.Matches.findAll({
        where: { user1: req.user.id }
      });
      //console.log(user1);

      //take user1 match data and see if the other users feel the same way about user1
      const user2 = await db.Matches.findAll({ where: { user2: idOfUser1 } });
      //res.json(user2);
      //console.log(user2);

      console.log(
        "User with the ID of " + idOfUser1 + " said yes to users with ID of "
      );
      const array = user2;

      for (i = 0; i < array.length; i++) {
        console.log(array[i].user1 + ", ");
      }

      const user1matches = await db.Matches.findAll({
        where: {
          user1: idOfUser1,
          complete: true
        }
      });

      console.log("These people also like this person: ");
      const array2 = user1matches;
      let myMatchesIDs = []; //create an empty array to store matches

      for (i = 0; i < array2.length; i++) {
        //console.log(array2[i].user2 + ", ");
        myMatchesIDs.push(array2[i].user2);
      }
      console.log(myMatchesIDs); //display array of ids for users matches

      let myMatches = [];
      for (i = 0; i < myMatchesIDs.length; i++) {
        const oneMatch = await db.User.findAll({
          where: { id: myMatchesIDs[i] }
        });

        console.log("User Data of Match: " + oneMatch);
        myMatches.push(oneMatch);
      }

      res.json(myMatches); //send json data of all matches
    } catch (error) {
      console.log(error);
    }
  });
  //checking for logged in middleware
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/");
  }
};
