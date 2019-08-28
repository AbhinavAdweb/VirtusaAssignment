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
    Vuser.findAll().then(result => {
        res.render('display', { result });
    }).catch(err => {
        res.render('error', { err });
    });
});

router.get("/create", auth, (req, res) => {
    res.render('add', { result: null, action: "/users/add" });
});

router.get("/update/:id", auth, (req, res) => {
    Vuser.findByPk(req.params.id).then(result => {
        res.render('add', { result, action: "/users/updateUser" });
    }).catch(err => {
        res.render('error', { err });
    });
});

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