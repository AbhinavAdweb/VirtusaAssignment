const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const db = require('./config/database');

const crudDisplayRoute = require('./routes/crudDisplay');
const crudJSONRoute = require('./routes/crudJSON');

const session = require('express-session');

const app = express();

// Use this to create session authentication
app.use(session({
    secret: 'virtusa',
    resave: true,
    saveUninitialized: true
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Authenticate database connection to check if the configurations are correct
db.authenticate()
    .then(() => console.log("Connection Successful"))
    .catch(err => console.error('Unable to connect to the database:', err));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// This router is used to visualize the user database CRUD operations and can be tested in the browser
app.use('/users', crudDisplayRoute);

// This router is returns the results in JSON for the user database CRUD operations and can be tested in the postman
app.use('/json/users', crudJSONRoute);

// Login page to let user enter a token and only create a session secret key/any variable for testing if it's value is "virtusa"
app.get('/login', function (req, res) {
    if (!req.query.secretKey || req.query.secretKey !== "virtusa") {
        res.render('error', { err: "Wrong Credentials" });
    } else if(req.query.secretKey === "virtusa") {
        req.session.secret = "virtusa";
        res.redirect('/users');
    }
});

// Destroy the current user session
app.get('/logout', function (req, res) {
    req.session.destroy();
    res.render('index');
});

app.get('/', (req, res) => {
    res.render('index');
});

// Route all the URLs that are not configured in the previous routers to a 404 error message
app.use((req, res) => {
    res.status(404).render('error', { err: "Page Not Found" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));