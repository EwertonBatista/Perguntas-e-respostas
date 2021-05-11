const Sequelize = require('sequelize')
const db = require('./db')



const Ask = db.define('Perguntas', {
    Titulo:{
        type: Sequelize.STRING,
              AllowNull: false
        
    },
    Pergunta: {
        type: Sequelize.TEXT,
              AllowNull: false
    }
})


Ask.sync({force:false}).then(() => {console.log('Tabela Ask criada')})

module.exports = Ask;