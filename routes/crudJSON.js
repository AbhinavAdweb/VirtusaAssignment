const express = require('express');
const router = express.Router();

// Import the Vuser sequelize model
const Vuser = require('../models/Vuser');

const basicAuth = require('basic-auth');
var compare = require('tsscmp');

// This will compare the name and password from the basi-auth module
// This uses tsscmp to properly compare the values and take care of 'undefined' results as well
function check(name, pass) {
    let valid = true

    // Simple method to prevent short-circut and use timing-safe compare
    valid = compare(name, 'virtusa') && valid
    valid = compare(pass, 'virtusa') && valid

    return valid
}

// Used for basic authentication
// When used in the other routes, the next functions is only executed when authenticated
const auth = function (req, res, next) {
    const user = basicAuth(req);

    if (!user || !check(user.name, user.pass)) {
        res.set('WWW-Authenticate', 'Basic realm=Unauthorized Access');
        res.status(401).json({ error: "Unauthorized Access" });
    } else {
        next();
    }
};

// Returns all the users saved in the database
router.get("/", auth, (req, res) => {
    Vuser.findAll()
        .then(result => {
            res.json(result)
        }).catch(err => {
            res.json(err)
        });
});

// Returns the user saved in the database with primary key id given
router.get("/:id", auth, (req, res) =>
    Vuser.findByPk(req.params.id)
        .then(result => {
            res.json(result)
        }).catch(err => {
            res.json(err)
        })
);

// Create a new user with the given JSON data
router.post("/add", auth, (req, res) =>
    Vuser.create({
        name: req.body.name,
        age: req.body.age,
        email: req.body.email
    }).then(result => {
        res.json(result)
    }).catch(err => {
        res.json(err)
    })
);

// Put a user with the given JSON data and id
router.put("/:id", auth, (req, res) =>
    Vuser.update({
        name: req.body.name,
        age: req.body.age,
        email: req.body.email
    },
        {
            where: {
                id: req.params.id
            }
        }).then(result => {
            res.json(result)
        }).catch(err => {
            res.json(err)
        })
);

// Delete a user with the given id
router.delete("/:id", auth, (req, res) =>
    Vuser.destroy({
        where: {
            id: req.params.id
        }
    }).then(result => {
        res.json(result)
    }).catch(err => {
        res.json(err)
    })
);

module.exports = router;