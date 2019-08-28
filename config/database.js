const Sequelize = require('sequelize');

// configuration for the database to be used with the Sequelize
// Need to manually create the database "virtusa" and the table vusers
const config = {
    host: 'localhost',
    username: 'root',
    password: 'root',
    port: 3306,
    database: 'virtusa',
    dialect: 'mysql'
}


module.exports = new Sequelize(config);