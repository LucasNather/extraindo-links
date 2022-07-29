const fs = require('fs')

function tratarErro(erro){
    throw new Error(console.log(erro.code + " gerou um erro"))
}

function extrairLink(texto){
    const regex = /\[([^\]]*)\]\((https?:\/\/[^$#\s].[^\s]*)\)/gm;
    const linksExtraidos = []
    let contador;
    while((contador = regex.exec(texto)) !== null ){
        linksExtraidos.push({ [contador[1]]:contador[2] })
    }
    return linksExtraidos.length === 0 ? "não tem links" : linksExtraidos;
}

async function pegarArquivo(caminhoArquivo){
    const encoding = "UTF-8"
    try{
        const texto = await fs.promises.readFile(caminhoArquivo,encoding)
        return extrairLink(texto)
    }catch(erro){
        return tratarErro(erro)
}
}

module.exports = pegarArquivo

