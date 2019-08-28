const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const db = require('./config/database');

const crudDisplayRoute = require('./routes/crudDisplay');
const crudJSONRoute = require('./routes/crudJSON');

const session = require('express-session');

const app = express();

app.use(session({
    secret: 'virtusa',
    resave: true,
    saveUninitialized: true
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

db.authenticate()
    .then(() => console.log("Connection Successful"))
    .catch(err => console.error('Unable to connect to the database:', err));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/users', crudDisplayRoute);

app.use('/json/users', crudJSONRoute);

app.get('/login', function (req, res) {
    if (!req.query.secretKey || req.query.secretKey !== "virtusa") {
        res.render('error', { err: "Wrong Credentials" });
    } else if(req.query.secretKey === "virtusa") {
        req.session.secret = "virtusa";
        res.redirect('/users');
    }
});

app.get('/logout', function (req, res) {
    req.session.destroy();
    res.render('index');
});

app.get('/', (req, res) => {
    res.render('index');
});

app.use((req, res) => {
    res.status(404).render('error', { err: "Page Not Found" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));