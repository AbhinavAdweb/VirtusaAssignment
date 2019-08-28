const express = require('express');
const router = express.Router();

// Import the Vuser sequelize model
const Vuser = require('../models/Vuser');

// Used for authentication based on session variable "secret" and check if it is "virtusa"
// When used in the other routes, the next functions is only executed when authenticated
var auth = function(req, res, next) {
    if (req.session && req.session.secret === "virtusa")
        return next();
    else
        return res.status(401).render('error', { err: "Unauthorized Access" });
};

// Returns all the users saved in the database and displays it on the display page or renders error page in case of error
router.get( "/", auth, (req, res) => {
    Vuser.findAll().then(result => {
        res.render('display', { result });
    }).catch(err => {
        res.render('error', { err });
    });
});


// Renders the add page for POST
router.get("/create", auth, (req, res) => {
    res.render('add', { result: null, action: "/users/add", buttonText: "Add" });
});

// Renders the add page for Update for the given id and loads error page in case of error
router.get("/update/:id", auth, (req, res) => {
    Vuser.findByPk(req.params.id).then(result => {
        res.render('add', { result, action: "/users/updateUser", buttonText: "Update" });
    }).catch(err => {
        res.render('error', { err });
    });
});

// Create a new user with the given form body and redirects to the users display page (might need to refresh the page to see the created data)
router.post("/add", auth, (req, res) => {
    Vuser.create({
        name: req.body.name,
        age: req.body.age,
        email: req.body.email
    }).then(
        res.redirect('/users')
    ).catch(err => {
        res.render('error', { err });
    });
});

// Updates user with the given form body and redirects to the users display page (might need to refresh the page to see the created data)
router.post("/updateUser", auth, (req, res) => {
    Vuser.update({
        name: req.body.name,
        age: req.body.age,
        email: req.body.email
    },

    {
        where: {
            id: req.body.id
        }

    }).then(
        res.redirect('/users')
    ).catch(err => {
        res.render('error', { err });
    });
});

// Deletes the user with the given id and redirects to the users display page (might need to refresh the page to see the created data)
router.get( "/deleteUser/:id", auth, (req, res) => {
    Vuser.destroy({
        where: {
            id: req.params.id
        }
    }).then(
        res.redirect('/users')
    ).catch(err => {
        res.render('error', { err });
    });
});

module.exports = router;