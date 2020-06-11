const express = require("express");
const app = express();
/* Para leer dados */
const bodyParser = require("body-parser");
/*Banco de dados*/
const connection = require("./data-base/data-base");
/*Criando um model */
const pergunta = require("./data-base/pergunta");
/*Criando uma maneira de resonder a resposta */
const Resposta = require("./data-base/Resposta");
//database

connection
    .authenticate()
    .then(() => {
        console.log("Conexao feita com o banco e dados");
    })
    .catch((error) => {
        console.log(error)
    })


app.set('view engine', 'ejs');
app.use(express.static('public'));
//ler dados do formularios
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//body parcer

app.get("/", (req, res) => {
    /*"Bem vindo ao meu site!");*/
    pergunta.findAll({
        raw: true,
        order: [
            //ordem das perguntas
            ['id', 'DESC']

        ]
    }).then(pergunta => {
        res.render("index", {
            pergunta: pergunta
        });
    });

});


/* Cria a rosta de perguntas */
app.get("/perguntar", (req, res) => {
    res.render("perguntar")
});

/*Criando rota para receber dados do formularios */
app.post("/salvarpergunta", (req, res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/")
    });
});
//buscando perguntas no banco de dados
app.get("/pergunta/:id", (req, res) => {
    var id = req.params.id;
    pergunta.findOne({
        where: { id: id }
    }).then(pergunta => {
        if (pergunta != undefined) { //pergunta encontraadda
            res.render("pergunta", {
                pergunta: pergunta
            });
        } else {
            res.redirect("/");
        }

    });
});
/*Rota para resposta */
app.post("/responder", (res, req) => {
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect("/pergunta/" + perguntaId); //
    });

});

app.listen(8080, () => {
    console.log("app rodando");
});