const fetch = (...args) => import('node-fetch')
.then(({default: fetch}) => fetch(...args))

function manejaErro(erro){
    throw new Error(console.log(erro.message))
}

async function verificarStatus(arrayLinks){
    try{
        const pegarLinks = await Promise.all(arrayLinks.map(async url => {
            const response = await fetch(url)
            return `${response.status} - ${response.statusText}`
        }))
    
        return pegarLinks
    }catch(erro){
        return manejaErro(erro)
    }
}

function gerarLinks(arrayLinks){
    return arrayLinks.map(objetoLinks => Object.values(objetoLinks).join())
}

async function validarLinks(arrayLinks){
    const links = gerarLinks(arrayLinks)
    const statusLinks = await verificarStatus(links)
    
    const resultado = arrayLinks.map((objeto,indice) => ({
        ...objeto,
        status: statusLinks[indice]
    }))

    return resultado
}

module.exports = validarLinks