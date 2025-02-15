const form = document.querySelector('form')
const body = document.querySelector('body')
const fatorCubagem = 300
const capacidade = 2000
 
form.addEventListener('submit', function(e){
    e.preventDefault()


 
    const largura = FormatarNumero(document.querySelector('input[name=largura]').value)
    const profundidade = FormatarNumero(document.querySelector('input[name=profundidade]').value)
    const altura = FormatarNumero(document.querySelector('input[name=altura]').value)
    const quantidade = FormatarNumero(document.querySelector('input[name=quantidade]').value)

    if(largura && profundidade && altura && quantidade)
    {

            const cubagem = CalcularCubagem(largura,profundidade,altura)
            const PesoPorCaixa = CalcularPeso(fatorCubagem, cubagem)
         
            const qtCaminhoes = CalcularQuantidadeCaminhoes(capacidade, PesoPorCaixa, quantidade)

            console.log(cubagem)
         
            if(!cubagem || !PesoPorCaixa || !qtCaminhoes)
            {
                CriarTextoAviso("Digite um número valido")
            }
            else
            {
                const div = document.createElement('div')
                div.id = "resposta"
                const pPeso = document.createElement('p')
                pPeso.textContent = `Peso da caixa: ${Math.round(PesoPorCaixa*100)/100} Kg`
             
                const pCubagem = document.createElement('p')
                pCubagem.textContent = `Cubagem da caixa: ${cubagem}`
             
                const pPesoTotal = document.createElement('p')
                pPesoTotal.textContent = `Peso total: ${Math.ceil(PesoPorCaixa*quantidade)} Kg`
             
                const pQtCaminhoes = document.createElement('p')
                pQtCaminhoes.textContent = `Quantidade de Caminhões: ${qtCaminhoes}`
            
                div.appendChild(pPeso)
                div.appendChild(pPesoTotal)
                div.appendChild(pCubagem)
                div.appendChild(pQtCaminhoes)
            
                if(document.getElementById("resposta")){
                    form.replaceChild(div, document.getElementById("resposta"))
                }
                else{
                    form.appendChild(div)
                }

            }

    }
    else
    {
        CriarTextoAviso("Algum dos campos está vazio")
    }
 


 
})
 
 
function CalcularCubagem(largura, profundidade, altura){
    return largura * profundidade * altura
}
 
function CalcularPeso(cubagem, fator){
    return fator * cubagem
}
 
function CalcularQtCaixas(capacidade, peso){
    return capacidade/peso
}
 
function CalcularQuantidadeCaminhoes(capacidade, peso, quantidade){
    return Math.ceil((peso * quantidade)/capacidade)
}

function FormatarNumero(numero){
    if(numero.includes(","))
    {
        return numero.replace(",",".")
    }
    else{
        return numero
    }
}

function CriarTextoAviso(text)
{

    const p = document.createElement("p")
    p.id = "TextAviso"
    p.textContent = text
    p.style.color = "red"
    p.style.animationName = "Desaparecer"
    p.style.animationDelay = "3.5s"
    p.style.animationDuration = "1s"
    setTimeout( function(){
        body.removeChild(p)
    },4000
    )

    if(!document.getElementById('TextAviso'))
    {
        body.appendChild(p)
    }
    else{
        body.replaceChild(p,document.getElementById('TextAviso'))
    }


    

}