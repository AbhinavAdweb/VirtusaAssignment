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

// Returns all the users saved in the database
router.get( "/", auth, (req, res) => {
    Vuser.findAll()
        .then(result => {
            res.json(result)
        })
        .catch(err => console.log(err));
});

// Returns the user saved in the database with primary key id given
router.get( "/:id", auth, (req, res) =>
    Vuser.findByPk(req.params.id).then( (result) => res.json(result))
);

// Create a new user with the given JSON data
router.post("/add", auth, (req, res) => 
    Vuser.create({
        name: req.body.name,
        age: req.body.age,
        email: req.body.email
    }).then( (result) => res.json(result) )
);

// Put a user with the given JSON data and id
router.put( "/:id", auth, (req, res) =>
    Vuser.update({
        name: req.body.name,
        age: req.body.age,
        email: req.body.email
    },
    {
        where: {
            id: req.params.id
        }
    }).then( (result) => res.json(result) )
);

// Delete a user with the given id
router.delete( "/:id", auth, (req, res) =>
    Vuser.destroy({
        where: {
            id: req.params.id
        }
    }).then( (result) => res.json(result) )
);

module.exports = router;