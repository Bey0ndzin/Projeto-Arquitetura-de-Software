require('dotenv').config()
const { parse } = require('dotenv')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const mysql = require('mysql2')
const connection = mysql.createConnection(process.env.DATABASE_URL)
const bd     = require("./bd");
const devedores = require("./devedores.js");

connection.connect();

app.get('/', async (req, res) =>
{
  var id = parseInt(req.query.id);
  var retorno;
  if(id===undefined || typeof id != 'number' || isNaN(id) || id !== parseInt(id) || id<=0){
    retorno = await devedores.recupereTodos()
  }
  else{
    retorno = await devedores.recupereUm(id)
  }
    
  res.send(retorno)
    /*connection.query(sql, function (err, rows, fields) {
      if (err) throw err
  
      res.send(rows)
    })*/
})

app.get('/incluir', async (req, res) =>
{
  var id = req.query.id;
  var nome = req.query.nome;
  var idade = req.query.idade;
  var sexo = req.query.sexo;
  var cep = req.query.cep;
  var divida = req.query.divida;

  await devedores.inclua({id: id, nome: nome, idade: idade, sexo: sexo, cep: cep, divida: divida});
  var sql = id? 'SELECT * FROM devedores WHERE id = '+id : 'SELECT * FROM devedores'
    connection.query(sql, function (err, rows, fields) {
      if (err) throw err
  
      res.send(rows)
    })
})

app.get('/atualizar', async (req, res) =>
{
  var id = req.query.id;
  var nome = req.query.nome;
  var sexo = req.query.sexo;
  var cep = req.query.cep;
  var idade = parseInt(req.query.idade);
  var divida = parseFloat(req.query.divida);

  if(nome != undefined && nome.trim() != "" && idade != undefined && sexo.trim() != "" && sexo.trim().length == 1 && cep.trim() != "" && cep.trim().length == 8)
    await devedores.atualize({id: id, nome: nome, idade: idade, sexo: sexo, cep: cep, divida: divida});
  var sql = id? 'SELECT * FROM devedores WHERE id = '+id : 'SELECT * FROM devedores'
    connection.query(sql, function (err, rows, fields) {
      if (err) throw err
  
      res.send(rows)
    })
})
app.get('/deletar', async (req, res) =>
{
  var id = req.query.id;
  await devedores.remova(id);
  var sql = 'SELECT * FROM devedores'
    connection.query(sql, function (err, rows, fields) {
      if (err) throw err
  
      res.send(rows)
    })
})
  
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})