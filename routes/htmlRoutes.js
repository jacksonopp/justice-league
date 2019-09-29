module.exports = function (app, passport) {
    app.get("/", function (req, res) {
        res.render("index");
    })

    // app.get("/signin", function (req, res) {
    //     res.render("signin");
    // });

    app.get("/signinFailed", function (req, res) {
        res.send("/");
    })

    app.post("/", passport.authenticate("local-signin", {
        successRedirect: "/dashboardLink",
        failureRedirect: "/signinFailed"
    }))


    //sends the link to redirect on the frontend
    app.get("/dashboardLink", function (req, res) {
        res.send("/dashboard");
    });

    //renders the signin page

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
        res.redirect('/signin');
    }
}