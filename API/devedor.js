const { parse } = require("dotenv")

class Devedor{
    #id
    #nome
    #idade
    #sexo
    #cep
    #divida

    constructor(id, nome, idade, sexo, cep, divida){
        this.id = id;
        this.nome = nome;
        this.idade = idade;
        this.sexo = sexo;
        this.cep = cep;
        this.divida = divida;
    }


    get id(){
        return this.#id;
    }
    get nome(){
        return this.#nome;
    }
    get idade(){
        return this.#idade;
    }
    get sexo(){
        return this.#sexo;
    }
    get cep(){
        return this.#cep;
    }
    get divida(){
        return this.#divida;
    }
    
    
    set id(id)
    {
        if(id===undefined || typeof id !== 'number' || isNaN(id) || id !== parseInt(id) || id<=0)
            throw('Id inválido!');

        this.#id = id;
    }
    set nome(nome)
    {
        if (nome===undefined || typeof nome !== 'string' || nome==="")
            throw ('Nome inválido');

        this.#nome = nome;
    }
    set idade(idade)
    {
        if(idade===undefined || typeof idade !== 'number' || isNaN(idade) || idade !== parseInt(idade) || idade<=0)
            throw('Idade inválida!');

        this.#idade = idade;
    }
    set sexo(sexo)
    {
        if (sexo===undefined || typeof sexo !== 'string' || sexo==="" || sexo.length > 1)
            throw ('sexo inválido');

        this.#sexo = sexo;
    }
    set cep(cep)
    {
        if (cep===undefined || typeof cep !== 'string' || cep==="" || cep.length > 8 || cep.length < 8)
            throw ('cep inválido');

        this.#cep = cep;
    }
    set divida(divida)
    {
        if(divida===undefined || typeof divida !== 'number' || isNaN(divida) || divida !== parseFloat(divida) || idade<=divida)
            throw('Divida inválida!');

        this.#divida = divida;
    }

}

function novo(id, nome, idade, sexo, cep, divida){
    return new Devedor(id, nome, idade, sexo, cep, divida);
}

module.exports = {novo}