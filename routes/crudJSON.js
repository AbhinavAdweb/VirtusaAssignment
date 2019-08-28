const express = require('express');
const router = express.Router();

const Vuser = require('../models/Vuser');

var auth = function(req, res, next) {
    if (req.session && req.session.secret === "virtusa")
        return next();
    else
        return res.status(401).render('error', { err: "Unauthorized Access" });
};

router.get( "/", auth, (req, res) => {
    Vuser.findAll()
        .then(result => {
            res.json(result)
        })
        .catch(err => console.log(err));
});

router.get( "/:id", auth, (req, res) =>
    Vuser.findByPk(req.params.id).then( (result) => res.json(result))
);

router.post("/add", auth, (req, res) => 
    Vuser.create({
        name: req.body.name,
        age: req.body.age,
        email: req.body.email
    }).then( (result) => res.json(result) )
);

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

router.delete( "/:id", auth, (req, res) =>
    Vuser.destroy({
        where: {
            id: req.params.id
        }
    }).then( (result) => res.json(result) )
);

module.exports = router;