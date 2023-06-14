async function getConexao()
{
    if(global.conexao && global.conexao.state !== 'disconnected')
        return global.conexao;

    const mysql = require('mysql2/promise');

    const conexao = await mysql.createConnection(process.env.DATABASE_URL);
    global.conexao = conexao;
    return conexao;
}

async function estrutureSe(){
    const conexao = await getConexao()
    const sql = 'CREATE TABLE IF NOT EXISTS devedores('+
    'id int primary key auto_increment not null, nome varchar(30) not null,'+
    'idade int not null, sexo varchar(1) not null, cep varchar(8) not null,'+ 
    'divida float not null)'
    return await conexao.query(sql);
}

module.exports = { getConexao, estrutureSe }