const Sequelize = require('sequelize');
const db = require('../config/database');

// Vuser model definition
const Vuser = db.define('vuser', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING
  },
  age: {
    type: Sequelize.INTEGER
  },
  email: {
    type: Sequelize.STRING
  }
})

module.exports = Vuser;