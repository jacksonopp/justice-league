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
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
      },
      // callback to gernerate hash and add new user
      function(req, email, password, done) {
        const generateHash = function(password) {
          return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
        };
        // abstracted sequelize findOne
        User.findOne({
          where: {
            email: email
          }
        }).then(function(user) {
          if (user) {
            return done(null, false, {
              message: "that email is already taken"
            });
          } else {
            const userPassword = generateHash(password);
            const data = {
              email: email,
              password: userPassword,
              first_name: req.body.first_name,
              last_name: req.body.last_name
            };
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

  passport.use(
    "local-signin",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
      },
      function(req, email, password, done) {
        const User = user;
        const isValidPassword = function(userpass, password) {
          return bCrypt.compareSync(password, userpass);
        };
        User.findOne({
          where: {
            email: email
          }
        })
          .then(function(user) {
            if (!user) {
              return done(null, false, {
                message: "email does not exist"
              });
            }
            if (!isValidPassword(user.password, password)) {
              return done(null, false, {
                message: "incorrect password."
              });
            }
            const userInfo = user.get();
            return done(null, userInfo);
          })
          .catch(function(err) {
            console.log("Error:", err);
            return done(null, false, {
              message: "something went wrong with your singin"
            });
          });
      }
    )
  );
};
