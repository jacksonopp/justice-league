//importing bCrypt
const bCrypt = require("bcrypt-nodejs");

//exporting function
module.exports = function(passport, user) {
  const User = user;
  const LocalStrategy = require("passport-local").Strategy;

  // creating a local strategy
  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true
      },
      // callback to gernerate hash and add new user
      function(req, username, password, done) {
        const generateHash = function(password) {
          return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
        };
        // abstracted sequelize findOne
        User.findOne({
          where: {
            username: username
          }
        }).then(function(user) {
          if (user) {
            return done(null, false, {
              message: "that username is already taken"
            });
          } else {
            // hash the password
            const userPassword = generateHash(password);
            //set up a data objet for the sequelize request
            const data = {
              username: username,
              email: req.body.email,
              password: userPassword,
              first_name: req.body.first_name,
              last_name: req.body.last_name
            };
            // create the new user with the data
            User.create(data).then(function(newUser, created) {
              if (!newUser) {
                return done(null, false);
              }
              if (newUser) {
                return done(null, newUser);
              }
            });
          }
        });
      }
    )
  );
  // serialize
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // deserialize user
  passport.deserializeUser(function(id, done) {
    User.findOne({
      where: {
        id: id
      }
    }).then(function(user) {
      if (user) {
        done(null, user.get());
      } else {
        done(user.errors, null);
      }
    });
  });

  // sign in local strategy
  passport.use(
    "local-signin",
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true
      },
      // callback to check if valid user
      function(req, username, password, done) {
        const User = user;
        // function that actually checks the password
        const isValidPassword = function(userpass, password) {
          return bCrypt.compareSync(password, userpass);
        };
        // sequelize find one function
        User.findOne({
          where: {
            username: username
          }
        })
          .then(function(user) {
            // if the user doesn't exist
            if (!user) {
              return done(null, false, {
                message: "email does not exist"
              });
            }
            // if the password is invalid
            if (!isValidPassword(user.password, password)) {
              return done(null, false, {
                message: "incorrect password."
              });
            }
            // get the user info
            const userInfo = user.get();
            return done(null, userInfo);
          })
          .catch(function(err) {
            // otherwise something went wrong
            console.log("Error:", err);
            return done(null, false, {
              message: "something went wrong with your singin"
            });
          });
      }
    )
  );
};
