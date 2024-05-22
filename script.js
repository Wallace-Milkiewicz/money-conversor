let selectedCurrency;
let selectedTo;
let input;

$(document).ready(function() 
{

    date();



    $("button").on("click", function(){


        input = $(".input-box").val();
        if (input === '' || isNaN(input)){
            alert("Digite um valor válido!");
        }else{
            // Substitua 'sua-chave-api' pela sua chave de API
        const api_key = '496f85132f5459cdc6b88ff7';
        const bills = ['USD', 'EUR', 'GBP', 'BTC', 'BRL'];

        async function buscarCotacoes() {
            let cotacoes = {};

            for (let moeda of bills) {
                let resposta = await fetch(`https://v6.exchangerate-api.com/v6/${api_key}/latest/${moeda}`);
                let dados = await resposta.json();

                cotacoes[moeda] = dados.conversion_rates;
            }

            return cotacoes;
        }

        buscarCotacoes().then(cotacoes => {
            let taxaDeCambio = cotacoes[selectedCurrency][selectedTo];
            let convertido = input*taxaDeCambio;
            $("#resultado").html(`${input} ${selectedCurrency} é igual a ${convertido.toFixed(2)} ${selectedTo}`);       
        });    
        }

        
    })

   

       

    $("#currency-select").change(function() {
         selectedCurrency = $(this).val();
        console.log(selectedCurrency);

        if (selectedCurrency === "EUR"){
            $(".img-fisrt").attr("src", "./1x/euroL.png");
        } else if(selectedCurrency === "USD") {
            $(".img-fisrt").attr("src","./1x/dolarL.png" );
        } else if(selectedCurrency === "BRL") {
            $(".img-fisrt").attr("src", "./1x/realL.png");
        }else if(selectedCurrency === "GBP") {
            $(".img-fisrt").attr("src", "./1x/libraL.png");
        }else if(selectedCurrency === "BTC") {
            $(".img-fisrt").attr("src", "./1x/bitcoinL.png");
        }
    });


    $("#to-select").change(function() {
         selectedTo = $(this).val();
        console.log(selectedTo);
    
        if (selectedTo === "EUR"){
            $(".img-second").attr("src", "./1x/euroR.png");
        } else if(selectedTo === "USD") {
            $(".img-second").attr("src", "./1x/dolarR.png");
        } else if(selectedTo === "BRL") {
            $(".img-second").attr("src", "./1x/realR.png");
        }else if(selectedTo === "GBP") {
            $(".img-second").attr("src", "./1x/libraR.png");
        }else if(selectedTo === "BTC") {
            $(".img-second").attr("src", "./1x/bitcoinR.png");
        }
    });
    


    function date(){

        /// Criar um novo objeto Date
let dataAtual = new Date();

// Obter o dia do mês
let dia = dataAtual.getDate();

// Obter o mês (de 0 a 11)
let mes = dataAtual.getMonth() + 1;

// Obter o ano
let ano = dataAtual.getFullYear();

// Formatando o dia e o mês para ter dois dígitos
if (dia < 10) {
dia = '0' + dia;
}

if (mes < 10) {
mes = '0' + mes;
}

// Exibir a data no formato DD/MM/AAAA
let data = ( dia + '/' + mes + '/' + ano);

$(".data").text("Cotação do dia: " + data);
}




   
});


