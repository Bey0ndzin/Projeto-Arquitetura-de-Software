require('dotenv').config()
const { parse } = require('dotenv')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const rotas    = require ('./rotas.js');

const mysql = require('mysql2')
const connection = mysql.createConnection(process.env.DATABASE_URL)
const bd     = require("./bd");
const devedores = require("./devedores.js");

connection.connect();

function middleWareGlobal (req, res, next)
{
    console.time('Duração'); // marca o início da requisição
    console.log('Iniciou  o processamento da requisição '+req.method+' em '+req.url); // indica o início do processamento da url, indicando também o método

    next(); // função que chama o processamento, propriamente dito, da requisição
               
    console.log('Terminou o processamento da requisição '+req.method+' em '+req.url); // indica o término do processamento da url, indicando também o método
    console.timeEnd('Duração'); // informa duração do processamento da requisição
}

async function ativacaoDoServidor ()
{
    const ret = await bd.estrutureSe();

    if (ret===null)
    {
        console.log ('Não foi possível estabelecer conexão com o BD!');
        process.exit(1);
    }

    if (ret===false)
    {
        console.log ('Não foi possível estruturar o BD!');
        process.exit(1);
    }

    const express = require('express');
    const app     = express();
    
    app.use(express.json());   // faz com que o express consiga processar JSON
    app.use(middleWareGlobal); // app.use cria o middleware global

    app.post  ('/devedores'        , rotas.inclusao); 
    app.put   ('/devedores/:codigo', rotas.atualizacao);
    app.delete('/devedores/:codigo', rotas.remocao);
    app.get   ('/devedores/:codigo', rotas.recuperacaoDeUm);
    app.get   ('/devedores'        , rotas.recuperacaoDeTodos);

    console.log ('Servidor ativo na porta 3000...');
    app.listen(3000);
}
ativacaoDoServidor();