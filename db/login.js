const Sequelize = require('sequelize')
const db = require('./db')

const login = db.define('login', {
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

login.sync({force:false}).then(() => {
    console.log('Tabela Login criada')
})


module.exports = login;