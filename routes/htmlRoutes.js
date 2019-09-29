const db = require("../models");
const moment = require("moment");

module.exports = function (app, passport) {
    app.get("/", function (req, res) {
        res.render("index");
    })

    //sign in
    app.post("/", passport.authenticate("local-signin", {
        successRedirect: "/dashboardLink",
        failureRedirect: "/signinFailed"
    }))

    app.get("/signinFailed", function (req, res) {
        res.send("/");
    })

    //sends the link to redirect on the frontend
    app.get("/dashboardLink", function (req, res) {
        res.send("/dashboard");
    });

    //renders the dashboard page
    app.get("/dashboard", isLoggedIn, async function (req, res) {
        const lastLogin = await db.User.update(
            { last_login: moment().format() },
            {
                where: {
                    id: req.user.id
                }
            }
        )
        res.render("dashboard", {
            username: req.user.username,
            last_login: req.user.last_login
        });
        console.log(req.user);
    });

    //ends the session
    app.get("/logout", function (req, res) {
        req.session.destroy(function (err) {
            res.redirect("/");
        })
    })

    app.get("/questionaire", function (req, res) {
        res.render("questionaire", {
            msg: "Welcome!"
        });
    });

    //post request to sign up (adds new user securely)
    app.post("/questionaire", passport.authenticate('local-signup', {
        successRedirect: "/dashboardLink",
        failureRedirect: '/signupFailed'
    }))

    app.get("/signupFailed", function (req, res) {
        res.render("/questionaire");
    })

    app.get("/matches/:id", function (req, res) { });

    // Browse all possible matches
    app.get("/browse", function (req, res) {
        res.render("browse", {
            msg: "Welcome!",
            examples: dbExamples
        });
    });

    // Render 404 page for any unmatched routes
    app.get("*", function (req, res) {
        res.render("404");
    });


    //checking for logged in middleware
    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/');
    }
}