const pegarArquivo = require("./index")
const caminho = process.argv
const validarLinks = require('./http-validacao')

async function pegarCaminho(caminho){
    const resposta = await pegarArquivo(caminho[2])
   if(caminho[3] === "validar"){
    console.log("links validados", await validarLinks(resposta))
   }else{
    console.log("links validados", resposta)
   }
}

pegarCaminho(caminho)