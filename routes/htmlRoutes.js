module.exports = function (app, passport) {
    app.get("/", function (req, res) {
        res.render("index");
    })

    //render signup page
    app.get("/signup", function (req, res) {
        res.render("signup");
    });

    app.get("/signupLink", function (req, res) {
        res.send("/signup");
    })
    //post request to sign up (adds new user securely)
    app.post("/signup", passport.authenticate('local-signup', {
        successRedirect: "/dashboardLink",
        failureRedirect: '/signupLink'
    }))
    //sends the link to redirect on the frontend
    app.get("/dashboardLink", function (req, res) {
        res.send("/dashboard");
    });

    //renders the signin page
    app.get("/signin", function (req, res) {
        res.render("signin");
    });

    app.get("/signinLink", function (req, res) {
        res.send("/signin");
    })

    app.post("/signin", passport.authenticate("local-signin", {
        successRedirect: "/dashboardLink",
        failureRedirect: "/signinLink"
    }))

    //renders the dashboard page
    app.get("/dashboard", isLoggedIn, function (req, res) {
        res.render("dashboard");
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
        res.redirect('/signin');
    }
}