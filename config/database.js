const Sequelize = require('sequelize');

const config = {
    host: 'localhost',
    username: 'root',
    password: 'root',
    port: 3306,
    database: 'virtusa',
    dialect: 'mysql'
}


module.exports = new Sequelize(config);