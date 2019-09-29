var db = require("../models");

module.exports = function (app, passport) {
    // Get all examples
    app.get("/api/all", async function (req, res) {
        try {
            const users = await db.PrivateTables.findAll({});
            res.json(users);
            console.log(users);
        } catch (error) {
            console.log(error);
        }
    });

    // Create a new example  -- use async await
    app.post("/api/examples", async function (req, res) {
        try {
            const user = await db.PrivateTables.create(req.body);
            console.log(user);
        } catch (error) {
            errorResult(error);
        }
    });

    // Delete an example by id
    app.delete("/api/examples/:id", function (req, res) {
        db.PrivateTables.destroy({ where: { id: req.params.id } }).then(function (
            PrivateTables
        ) {
            res.json(PrivateTables);
        });
    });

    app.post("/api/private", async function (req, res) {
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
};
