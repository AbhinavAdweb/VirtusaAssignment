const path = require('path');

const express = require('express');

const app = express();

const createRoute = require('./routes/create');
const displayRoute = require('./routes/display');

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));

app.use(createRoute);

app.use(displayRoute);

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(3000);