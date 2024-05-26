// ==UserScript==
// @name         Auto Ram and Axe
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Rafael
// @match        https://*.tribalwars.com.br/*&screen=am_farm*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tribalwars.com.br
// @grant        none
// ==/UserScript==

// Função para gerar um atraso aleatório entre min e max milissegundos
function randomDelay(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Função principal para executar as ações
function executeActions() {
    // Seleciona todas as imagens com o src e data-title especificados
    var redDots = document.querySelectorAll("img[src='https://dsbr.innogamescdn.com/asset/9639a99d/graphic/dots/red.png'][data-title='Derrotado']");
    var yellowDots = document.querySelectorAll("img[src='https://dsbr.innogamescdn.com/asset/9639a99d/graphic/dots/yellow.png'][data-title='Perdas']");

    // Verifica se existe alguma bolinha vermelha ou amarela
    if (redDots.length > 0 || yellowDots.length > 0) {
        console.log("Bolinha vermelha ou amarela encontrada. Iniciando sequência de ações...");

        // Seleciona a primeira bolinha vermelha ou amarela encontrada
        var dot = redDots.length > 0 ? redDots[0] : yellowDots[0];

        // Seleciona a linha do elemento da bolinha
        var villageRow = dot.closest('tr');

        if (villageRow) {
            // Clica no link especificado
            villageRow.querySelector("td:nth-child(12) > a").click();

            // Adiciona um atraso aleatório para garantir que a próxima página seja carregada
            setTimeout(function() {
                // Preenche o campo com o valor 30
                document.querySelector("#unit_input_axe").value = 30;

                // Preenche o campo com o valor 4
                document.querySelector("#unit_input_ram").value = 4;

                // Clica no botão de ataque
                document.querySelector("#target_attack").click();

                // Adiciona um atraso aleatório para garantir que a confirmação seja exibida
                setTimeout(function() {
                    // Clica no botão de confirmação do ataque
                    document.querySelector("#troop_confirm_submit").click();

                    // Adiciona um atraso antes de recarregar a página e verificar novamente
                    setTimeout(function() {
                        location.reload();
                        setTimeout(executeActions, randomDelay(500, 1000));
                    }, randomDelay(500, 1000));
                }, randomDelay(500, 1000)); // Atraso aleatório para a confirmação do ataque
            }, randomDelay(500, 1000)); // Atraso aleatório para o preenchimento dos campos
        } else {
            console.log("Não foi possível encontrar a linha da tabela da bolinha.");
        }
    } else {
        console.log("Nenhuma bolinha vermelha ou amarela encontrada. Finalizando script.");
    }
}

// Inicia o loop de execução das ações
executeActions();
