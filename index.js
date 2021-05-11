// Importações e declarações ↓
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./db/db');
const Ask = require('./db/Ask')
const Answer = require('./db/Answer')
const login = require('./db/login')


// Authenticate db ↓
db.authenticate()
    .then(function () {
        console.log('Banco de dados rodando!')
    })
    .catch(function ( ) {
        console.log('Erro ao rodar banco de dados!')
    })


// View Engine ↓
app.set('view engine', 'ejs');
app.use(express.static('public'));

//BodyParser ↓
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

// Rotas ↓


// Rotas .GET ↓
app.get('/', (req, res) => {
    Ask.findAll({
        raw: true, order: [
            ['id', 'desc']
        ]
    }).then(perguntas => {
        // console.log(perguntas)
        res.render('index', {
            perguntas: perguntas
        })

    })

})

app.get('/perguntar', (req, res) => {
    res.render('perguntar.ejs');
})

app.get('/cade/:id', (req, res) => {
    var id = req.params.id;
    Ask.findOne({
        where: { id: id }
    }).then(pergunta => {

        if (pergunta != undefined) {

            Answer.findAll({
                where: { perguntaId: pergunta.id }
            })

                .then(resposta => {

                    res.render('pergunta', {
                        pergunta: pergunta,
                        resposta:resposta

                    })

                })
            } else {
    
                res.redirect('/')
    
            }

    })
})


// Rotas .POST ↓ 

app.post('/salvarpergunta', (req, res) => {
    Ask.create({
        Titulo: req.body.pergunta,
        Pergunta: req.body.descrever
    }).then(() => {
        res.redirect('/perguntar')
    }).catch((err) => {
        res.send('Falha no envio da pergunta' + err)
    })
})


app.post('/salvarresposta', (req, res) => {

    var identificador = req.body.perguntaid;
    var corpo = req.body.resposta;
    
    Answer.create({
        resposta: corpo,
        perguntaId: identificador
    }).then(() => {
        res.redirect("/cade/" + identificador)
    })

})

// Admin Routes ↓

app.post('/criarlogin', (req, res) => {
    login.create({
        email: req.body.emaillogin,
        senha: req.body.senhalogin
    }).then(() => { console.log('login e senha criados')})
})

app.get('/admin', (req, res) => {
    res.render('criarlogin')
})

////////////////////////////////////////////////////////////////


app.get('/fazerlogin', (req, res) => {
    res.render('fazerlogin')
})

app.post('/fazerlogin', (req, res) => {

    var emaillogin = req.body.emaillogin
    var senhaemail = req.body.senhalogin

    console.log(`${req.body.emaillogin} ${req.body.senhalogin}`)

    login.findOne({
        where: { email: emaillogin, senha: senhaemail}
    }).then((usuario) => {
        
    })
})


// Servidor ↓
app.listen(8081, () => { console.log('Server started') })