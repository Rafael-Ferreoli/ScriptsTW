// ==UserScript==
// @name         Farm Inteligente
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  try to take over the world!
// @author       You
// @match        https://*.tribalwars.com.br/*&screen=am_farm*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tribalwars.com.br
// @grant        none
// ==/UserScript==

// Função principal para executar as ações
var lightTroops;
var cancelFor = false;
var saqueParcial = document.querySelectorAll("img[src='https://dsbr.innogamescdn.com/asset/62e187d5/graphic/max_loot/0.png'][data-title='Saque parcial: Seus soldados saquearam tudo o que encontram.']");
var saqueTotal = document.querySelectorAll("img[src='https://dsbr.innogamescdn.com/asset/62e187d5/graphic/max_loot/1.png'][data-title='Saque completo: os seus soldados saquearam tudo o que foi possível de carregar.']");

async function executeActions() {
    checkLight();
    if (cancelFor == true) {
        return;
    }
    console.log("Iniciando execução do script...");

    // Função auxiliar para realizar saque
    async function performSaque(saque, childIndex, templateName) {
        checkLight();
        if (cancelFor == true) {
            return;
        }
        var villageRow = saque.closest('tr');
        await delayAction(randomDelay(300, 400)); // Aplica o atraso dentro do loop de saques
        console.log(`Enviando Template ${templateName}`);
        var templateLink = villageRow.querySelector(`td:nth-child(${childIndex}) > a`);
        if (templateLink) {
            templateLink.click();
        } else {
            console.log(`Link de Template ${templateName} não encontrado.`);
        }
    }

    // Seleciona todas as imagens com o src e data-title especificados
    if (saqueTotal.length > 0) {
        console.log("saqueTotal encontrada. Iniciando sequência de ações...");
        for (let saque of saqueTotal) {
            if (cancelFor == true) {
                break;
            } else {
                await performSaque(saque, 10, 'B');
                if (cancelFor == true) {
                    break;
                }
            }
        }
    }

    // Depois de processar saque total, verifica saque parcial
    if (saqueParcial.length > 0) {
        console.log("saqueParcial encontrada. Iniciando sequência de ações...");
        for (let saque of saqueParcial) {
            if (cancelFor == true) {
                break;
            } else {
                await performSaque(saque, 9, 'A');
                if (cancelFor == true) {
                    break;
                }
            }
        }
    }

    // Verifica novamente o número de tropas e a disponibilidade de saques
    checkLight();
    if (!cancelFor) {
        console.log("Todas as opções de saque foram processadas, mas ainda há tropas disponíveis. Recarregando a página.");
        const reloadDelay = randomDelay(60000, 120000);
        console.log(`Recarregando a página em ${reloadDelay} milissegundos.`);
        setTimeout(() => {
            location.reload();
        }, reloadDelay);
    }
}

// Função para gerar um atraso aleatório entre min e max milissegundos
function randomDelay(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Função para criar uma promessa de atraso
function delayAction(delay) {
    return new Promise(resolve => setTimeout(resolve, delay));
}

function checkLight() {
    saqueParcial = document.querySelectorAll("img[src='https://dsbr.innogamescdn.com/asset/62e187d5/graphic/max_loot/0.png'][data-title='Saque parcial: Seus soldados saquearam tudo o que encontram.']");
    saqueTotal = document.querySelectorAll("img[src='https://dsbr.innogamescdn.com/asset/62e187d5/graphic/max_loot/1.png'][data-title='Saque completo: os seus soldados saquearam tudo o que foi possível de carregar.']");
    lightTroops = parseInt(document.querySelector("#light").innerText.trim());
    if (lightTroops < 4 || (saqueTotal.length == 0 && saqueParcial.length == 0)) {
        console.log("Menos de 4 cavalos leves disponíveis ou saques finalizados. Parando a execução do script e recarregando a página.");
        // Recarregar a página com um intervalo de tempo aleatório entre 60.000 e 120.000 milissegundos
        const reloadDelay = randomDelay(60000, 120000);
        console.log(`Recarregando a página em ${reloadDelay} milissegundos.`);
        setTimeout(() => {
            location.reload();
        }, reloadDelay);
        cancelFor = true;
    }
}

// Chama a função principal para iniciar a execução do script
executeActions();
