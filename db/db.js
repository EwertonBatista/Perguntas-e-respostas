const Sequelize = require('sequelize');

const db = new Sequelize('ewerton2','ewerton2one','1234567',{
    host: 'localhost',
    dialect: 'mysql'
})


module.exports = db;