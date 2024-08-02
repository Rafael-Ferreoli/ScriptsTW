// ==UserScript==
// @name         auto farm god uma rot
// @namespace    http://tampermonkey.net/
// @version      2024-06-15
// @description  Tentar dominar o mundo!
// @author       Você
// @match        https://*.tribalwars.com.br/*&screen=am_farm*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function verificarElementoEExecutar() {
        const elemento = document.querySelector("#content_value > div:nth-child(5) > div > form > table > tbody > tr:nth-child(1) > td:nth-child(10) > div > input");

        if (!elemento) {
            console.log("Elemento não encontrado, parando o script.");
            return;
        }

        const webhookUrl = 'https://discord.com/api/webhooks/1251931004088750202/8sOCcjod-kDyy5e5TP7tNIRwiE8a0GwaGfRwcDB5daOlc_z1D7brNeMtOfgqLCJMw13Q';

        function sendDiscordAlert(message) {
            fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    content: message
                })
            }).then(response => {
                if (response.ok) {
                    console.log('Alerta enviado para o Discord!');
                } else {
                    console.error('Erro ao enviar alerta para o Discord:', response.statusText);
                }
            }).catch(error => {
                console.error('Erro ao enviar alerta para o Discord:', error);
            });
        }

        function checkForElement() {
            const element = document.querySelector("#botprotection_quest");
            if (element) {
                sendDiscordAlert('Elemento #botprotection_quest encontrado na página!');
                console.log("Elemento encontrado! Alerta enviado para o Discord...");
                element.click();
            } else {
                console.log("Elemento não encontrado. Verificando novamente em 10 segundos...");
                setTimeout(checkForElement, 10000);
            }
        }

        checkForElement();

        console.log("Elemento encontrado, iniciando execução...");

        function clickElement(selector) {
            const element = document.querySelector(selector);
            if (element) {
                element.click();
                console.log(`Elemento clicado: ${selector}`);
            } else {
                console.log(`Elemento não encontrado: ${selector}`);
            }
        }

        function setInputValue(selector, value) {
            const element = document.querySelector(selector);
            if (element) {
                element.value = value;
                console.log(`Valor do ${selector} definido para ${value}`);
            } else {
                console.log(`Elemento não encontrado: ${selector}`);
            }
        }

        function randomDelay(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        function farmRoutine() {
            console.log("Iniciando rotina de farm...");

            clickElement("#quickbar_contents > ul:nth-child(1) > li:nth-child(8) > span > a");

            setTimeout(() => {
                clickElement("#popup_box_FarmGod > div > div > input");

                setTimeout(() => {
                    function clickFarmLinks() {
                        const farmLinkB = document.querySelector("#content_value > div.vis.farmGodContent > table > tbody > tr:nth-child(3) > td:nth-child(4) > a");
                        const farmLinkA = document.querySelector("#content_value > div.vis.farmGodContent > table > tbody > tr.farmRow.row_a > td:nth-child(4) > a");
                        const clickDelay = randomDelay(400, 500);
                        if (farmLinkB) {
                            farmLinkB.click();
                            console.log("Clicou no link de farm");
                            setTimeout(clickFarmLinks, clickDelay);
                        } else {
                            console.log("Não há mais links de farm. Rotação e farm concluídos.");

                            const reloadDelay = randomDelay(5000, 15000);
                            console.log(`Recarregando a página em ${reloadDelay / 1000} segundos...`);
                            setTimeout(() => {
                                location.reload();
                            }, reloadDelay);
                        }
                    }

                    clickFarmLinks();

                }, 30000);

            }, 10000);
        }

        setTimeout(farmRoutine, 5000);
    }

    verificarElementoEExecutar();

})();
