// ==UserScript==
// @name         Farm Inteligente
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  try to take over the world!
// @author       You
// @match        https://*.tribalwars.com.br/*&screen=am_farm*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tribalwars.com.br
// @grant        none
// ==/UserScript==

// Função principal para executar as ações
async function executeActions() {
    var saqueTotal = document.querySelectorAll("img[src='https://dsbr.innogamescdn.com/asset/62e187d5/graphic/max_loot/1.png'][data-title='Saque completo: os seus soldados saquearam tudo o que foi possível de carregar.']");
    var saqueParcial = document.querySelectorAll("img[src='https://dsbr.innogamescdn.com/asset/62e187d5/graphic/max_loot/0.png'][data-title='Saque parcial: Seus soldados saquearam tudo o que encontram.']");

    if (saqueTotal.length > 0) {
        console.log("saqueTotal encontrada. Iniciando sequência de ações...");

        for (let saque of saqueTotal) {
            var villageRowB = saque.closest('tr');
            await delayAction(randomDelay(300, 400)); // Aplica o atraso dentro do loop de saques totais
            console.log("Enviando Templates B");
            var templateB = villageRowB.querySelector("td:nth-child(10) > a");
            if (templateB) {
                templateB.click();
            } else {
                console.log("Link de Template B não encontrado.");
            }
        }
    } else if (saqueParcial.length > 0){
        console.log("Saques parciais encontrados: ", saqueParcial.length);

        console.log("saqueParcial encontrada. Iniciando sequência de ações...");
        for (let saque of saqueParcial) {
            var villageRowA = saque.closest('tr');
            if (villageRowA) {
                console.log("Enviando Templates A");
                var templateA = villageRowA.querySelector("td:nth-child(9) > a");
                if (templateA) {
                    templateA.click();
                } else {
                    console.log("Link de Template A não encontrado.");
                }
            }
            await delayAction(randomDelay(300, 400)); // Aplica o atraso dentro do loop de saques parciais
        }
    } else {
        console.log("Nenhuma bolinha vermelha ou amarela encontrada.");
    }

    var lightTroops = parseInt(document.querySelector("#light").innerText.trim());
    if (lightTroops >= 4) {
        console.log("Mais de 3 cavalos leves disponíveis. Continuando a execução do script.");
        await executeActions(); // Chama a função novamente
    } else {
        console.log("Menos de 4 cavalos leves disponíveis. Parando a execução do script e recarregando a página.");

        // Recarregar a página com um intervalo de tempo aleatório entre 60.000 e 120.000 milissegundos
        const reloadDelay = randomDelay(60000, 120000);
        console.log(`Recarregando a página em ${reloadDelay} milissegundos.`);
        setTimeout(() => {
            location.reload();
        }, reloadDelay);

        return; // Parar a execução do script
    }
}

function randomDelay(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function delayAction(delay) {
    return new Promise(resolve => setTimeout(resolve, delay));
}

executeActions();
