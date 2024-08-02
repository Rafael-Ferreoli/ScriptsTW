// ==UserScript==
// @name         Auto Market
// @version      0.6
// @description  Vende recursos por PPs!
// @author       Rafael
// @match        https://*.tribalwars.com.br/*&screen=market&mode=exchange*
// @require      https://code.jquery.com/jquery-2.2.4.min.js
// @run-at       document-end
// ==/UserScript==

function buttonElement() {
    $(".btn-premium-exchange-buy").click();
    setTimeout(confirmButton, 1000);
}

function confirmButton() {
    $(".btn-confirm-yes").click();
}

(function() {
    'use strict';

    let isActionInProgress = false;

    // Função para verificar se o botão de venda está habilitado
    function isButtonEnabled() {
        var buttonElement = document.querySelector("#premium_exchange_form > input");
        return buttonElement && !buttonElement.disabled;
    }

    // Função para definir o valor do input, clicar no botão e clicar na confirmação final
    function setValueAndClick(selector, stockSelector, capacitySelector) {
        var inputElement = document.querySelector(selector);
        var stockElement = document.querySelector(stockSelector);
        var capacityElement = document.querySelector(capacitySelector);

        if (stockElement && capacityElement && stockElement.textContent !== capacityElement.textContent) {
            var stock = parseInt(stockElement.textContent.replace(',', ''));
            var capacity = parseInt(capacityElement.textContent.replace(',', ''));
            var valueToSet = isNaN(stock) || isNaN(capacity) ? 1 : capacity - stock;

            if (inputElement && inputElement.value != valueToSet) {
                inputElement.value = valueToSet;
                var event = new Event('input', { bubbles: true });
                inputElement.dispatchEvent(event); // Dispara o evento de input para que o valor seja atualizado
                isActionInProgress = true;

                setTimeout(() => {
                    buttonElement();
                    console.log("Recurso vendido");
                    setTimeout(() => {
                        isActionInProgress = false;
                    }, 2000); // Tempo suficiente para a ação ser concluída
                }, getRandomDelay());

                return true; // Retorna true se o input foi encontrado e o valor foi definido
            }
        }
        return false; // Retorna false se os valores forem iguais ou o input não foi encontrado
    }

    // Função para obter um delay aleatório entre 100 e 200ms
    function getRandomDelay() {
        return Math.floor(Math.random() * 100) + 100;
    }

    // Seletores dos inputs e seus respectivos seletores de stock e capacity
    var elements = [
        {
            input: "#premium_exchange_sell_wood > div:nth-child(1) > input",
            stock: "#premium_exchange_stock_wood",
            capacity: "#premium_exchange_capacity_wood"
        },
        {
            input: "#premium_exchange_sell_stone > div:nth-child(1) > input",
            stock: "#premium_exchange_stock_stone",
            capacity: "#premium_exchange_capacity_stone"
        },
        {
            input: "#premium_exchange_sell_iron > div:nth-child(1) > input",
            stock: "#premium_exchange_stock_iron",
            capacity: "#premium_exchange_capacity_iron"
        }
    ];

    // Função de verificação periódica
    function checkAndSetValues() {
        if (isButtonEnabled() && !isActionInProgress) {
            console.log("Verificando");
            for (var i = 0; i < elements.length; i++) {
                var element = elements[i];
                if (setValueAndClick(element.input, element.stock, element.capacity)) {
                    break; // Se um input foi encontrado e definido, para a verificação
                }
            }
        }
    }

    // Executa a função de verificação a cada 100ms
    setInterval(checkAndSetValues, 100);
})();

