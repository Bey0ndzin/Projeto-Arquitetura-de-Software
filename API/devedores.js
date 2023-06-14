const bd = require ('./bd');

async function inclua (devedor)
{
    const conexao = await bd.getConexao ();
    const sql     = 'INSERT INTO devedores (id,nome,idade,sexo,cep,divida) VALUES (?,?,?,?,?,?)';
    const dados   = [devedor.id,devedor.nome,devedor.idade,devedor.sexo,devedor.cep,devedor.divida];

    return await conexao.query (sql, dados);
}

async function atualize (devedor)
{
    const conexao = await bd.getConexao ();
    
    const sql   = 'UPDATE devedores SET nome=?,idade=?,sexo=?,cep=?,divida=? WHERE id=?';
    const dados = [devedor.nome,devedor.idade,devedor.sexo,devedor.cep,devedor.divida,devedor.id];

    return await conexao.query (sql,dados);
}
    
async function remova (id)
{
    const conexao = await bd.getConexao ();
    
    const sql   = 'DELETE FROM devedores WHERE id=?';
    const dados = [id];

    return await conexao.query (sql,dados);
}

async function recupereUm (id)
{
    const conexao = await bd.getConexao();
    
    const  sql     = 'SELECT * FROM devedores WHERE id=?';
    const  dados   = [id];
    const [linhas] = await conexao.query(sql,dados);
    
    return linhas;
}

async function recupereTodos ()
{
    const conexao = await bd.getConexao();

    const  sql     = 'SELECT * FROM devedores';
    const [linhas] = await conexao.query(sql);

    return linhas;
}

module.exports = {inclua, atualize, remova, recupereUm, recupereTodos}



