const Sequelize = require('sequelize')
const db = require('./db')

const Answer = db.define('Respostas', {
    resposta: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    perguntaId: {
        type: Sequelize.INTEGER,
        AllowNull: false
    }
})

Answer.sync({force:false}).then(() => {console.log('Tabela Answer Criada')})

module.exports = Answer;