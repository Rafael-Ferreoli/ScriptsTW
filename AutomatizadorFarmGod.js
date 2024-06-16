// ==UserScript==
// @name         auto farm god
// @namespace    http://tampermonkey.net/
// @version      2024-06-15
// @description  try to take over the world!
// @author       You
// @match        https://br127.tribalwars.com.br/game.php?village=2943&screen=am_farm
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tribalwars.com.br
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function clickElement(selector) {
        const element = document.querySelector(selector);
        if (element) {
            element.click();
            console.log(`Clicked element: ${selector}`);
        } else {
            console.log(`Element not found: ${selector}`);
        }
    }

    function randomDelay(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function farmRoutine() {
        console.log("Starting farm routine...");

        // Clique no elemento no quickbar
        clickElement("#quickbar_contents > ul:nth-child(1) > li:nth-child(8) > span > a");

        // Espera 5 segundos
        setTimeout(() => {
            // Clique no botão dentro do popup
            clickElement("#popup_box_FarmGod > div > div > input");

            // Espera 10 segundos
            setTimeout(() => {
                // Função para clicar nos links de farm até que não haja mais opções
                function clickFarmLinks() {
                    const farmLinkB = document.querySelector("#content_value > div.vis.farmGodContent > table > tbody > tr:nth-child(3) > td:nth-child(4) > a");
                    const farmLinkA = document.querySelector("#content_value > div.vis.farmGodContent > table > tbody > tr.farmRow.row_a > td:nth-child(4) > a");

                    if (farmLinkB) {
                        farmLinkB.click();
                        console.log("Clicked farm link B");
                        setTimeout(clickFarmLinks, 1000); // Espera 1 segundo antes de tentar novamente
                    } else if (farmLinkA) {
                        farmLinkA.click();
                        console.log("Clicked farm link A");
                        setTimeout(clickFarmLinks, 1000); // Espera 1 segundo antes de tentar novamente
                    } else {
                        // Se não houver mais links, recarrega a página após um delay aleatório e reinicia o processo
                        const reloadDelay = randomDelay(60000, 120000);
                        console.log(`No more farm links, reloading the page in ${reloadDelay / 1000} seconds...`);
                        setTimeout(() => {
                            location.reload();
                        }, reloadDelay);
                    }
                }

                // Inicia a função para clicar nos links de farm
                clickFarmLinks();

            }, 10000); // Espera 10 segundos após clicar no botão dentro do popup

        }, 5000); // Espera 5 segundos após clicar no elemento no quickbar
    }

    // Espera 5 segundos antes de iniciar a rotina de farming
    setTimeout(farmRoutine, 5000);

})();
