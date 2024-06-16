// ==UserScript==
// @name auto farm god
// @namespace http://tampermonkey.net/
// @version 2024-06-15
// @description Tentar dominar o mundo!
// @autor Você
// @match *://*/*
// @grant none
// ==/UserScript==

(function() {
	'use strict';
	
	function verificarElementoEExecutar() {
		// Seleciona o elemento desejado
		const elemento = document.querySelector("#content_value > div:nth-child(5) > div > form > table > tbody > tr:nth-child(1) > td:nth-child(10) > div > input");
		
		// Verifica se o elemento existe
		if (!elemento) {
			// Se o elemento não existir, para o script ou faça alguma ação alternativa
			console.log("Elemento não encontrado, parando o script.");
			// Coloque aqui a ação que você quer executar caso o elemento não seja encontrado
			return; // Para a execução do script aqui
		}
		
		// Se chegou até aqui, significa que o elemento foi encontrado
		console.log("Elemento encontrado, iniciando execução...");
		// Coloque aqui o código que você deseja executar caso o elemento exista
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
		
		function rotacaoTropas() {
			console.log("Iniciando rotação de tropas...");
			
			// Definir valores iniciais das tropas
			setInputValue("#content_value > div:nth-child(5) > div > form > table > tbody > tr:nth-child(2) > td:nth-child(3) > input[type=text]", 6);
			setInputValue("#content_value > div:nth-child(5) > div > form > table > tbody > tr:nth-child(2) > td:nth-child(4) > input[type=text]", 4);
			setInputValue("#content_value > div:nth-child(5) > div > form > table > tbody > tr:nth-child(2) > td:nth-child(5) > input[type=text]", 0);
			clickElement("#content_value > div:nth-child(5) > div > form > table > tbody > tr:nth-child(1) > td:nth-child(10) > div > input");
			
			
			// Salvar estado no localStorage
			localStorage.setItem('rotationPhase', 'initial');
		}
		
		function farmRoutine() {
			console.log("Iniciando rotina de farm...");
			
			// Clica no elemento no quickbar
			clickElement("#quickbar_contents > ul:nth-child(1) > li:nth-child(8) > span > a");
			
			// Espera 5 segundos
			setTimeout(() => {
				// Clica no botão dentro do popup
				clickElement("#popup_box_FarmGod > div > div > input");
				
				// Espera 10 segundos
				setTimeout(() => {
					// Função para clicar nos links de farm até que não haja mais opções
					function clickFarmLinks() {
						const farmLinkB = document.querySelector("#content_value > div.vis.farmGodContent > table > tbody > tr:nth-child(3) > td:nth-child(4) > a");
						const farmLinkA = document.querySelector("#content_value > div.vis.farmGodContent > table > tbody > tr.farmRow.row_a > td:nth-child(4) > a");
						
						if (farmLinkB) {
							farmLinkB.click();
							console.log("Clicou no link de farm B");
							setTimeout(clickFarmLinks, 1000); // Espera 1 segundo antes de tentar novamente
							} else if (farmLinkA) {
							farmLinkA.click();
							console.log("Clicou no link de farm A");
							setTimeout(clickFarmLinks, 1000); // Espera 1 segundo antes de tentar novamente
							} else {
							console.log("Não há mais links de farm, redefinindo valores das tropas...");
							
							// Redefinir valores das tropas e iniciar segunda rotação
							setInputValue("#content_value > div:nth-child(5) > div > form > table > tbody > tr:nth-child(2) > td:nth-child(3) > input[type=text]", 0);
							setInputValue("#content_value > div:nth-child(5) > div > form > table > tbody > tr:nth-child(2) > td:nth-child(4) > input[type=text]", 0);
							setInputValue("#content_value > div:nth-child(5) > div > form > table > tbody > tr:nth-child(2) > td:nth-child(5) > input[type=text]", 10);
							clickElement("#content_value > div:nth-child(5) > div > form > table > tbody > tr:nth-child(1) > td:nth-child(10) > div > input");
							
							// Salvar estado no localStorage
							localStorage.setItem('rotationPhase', 'second');
							
							// Espera 5 segundos e inicia a rotina de farm novamente
							setTimeout(() => {
								clickElement("#quickbar_contents > ul:nth-child(1) > li:nth-child(8) > span > a");
								
								setTimeout(() => {
									clickElement("#popup_box_FarmGod > div > div > input");
									
									setTimeout(() => {
										function clickFarmLinksAgain() {
											const farmLinkB = document.querySelector("#content_value > div.vis.farmGodContent > table > tbody > tr:nth-child(3) > td:nth-child(4) > a");
											const farmLinkA = document.querySelector("#content_value > div.vis.farmGodContent > table > tbody > tr.farmRow.row_a > td:nth-child(4) > a");
											
											if (farmLinkB) {
												farmLinkB.click();
												console.log("Clicou no link de farm B novamente");
												setTimeout(clickFarmLinksAgain, 1000);
												} else if (farmLinkA) {
												farmLinkA.click();
												console.log("Clicou no link de farm A novamente");
												setTimeout(clickFarmLinksAgain, 1000);
												} else {
												const reloadDelay = randomDelay(60000, 120000);
												console.log(`Não há mais links de farm, recarregando a página em ${reloadDelay / 1000} segundos...`);
												setTimeout(() => {
													localStorage.removeItem('rotationPhase');
													location.reload();
												}, reloadDelay);
											}
										}
										
										clickFarmLinksAgain();
										
									}, 10000);
									
								}, 5000);
								
							}, 5000);
						}
					}
					
					clickFarmLinks();
					
				}, 10000);
				
			}, 5000);
		}
		
		// Verifica o estado salvo no localStorage
		const rotationPhase = localStorage.getItem('rotationPhase');
		
		if (rotationPhase === 'initial') {
			console.log("Continuando rotação de tropas inicial...");
			setTimeout(farmRoutine, 5000);
			} else if (rotationPhase === 'second') {
			console.log("Continuando rotação de tropas secundária...");
			setTimeout(() => {
				clickElement("#quickbar_contents > ul:nth-child(1) > li:nth-child(8) > span > a");
				
				setTimeout(() => {
					clickElement("#popup_box_FarmGod > div > div > input");
					
					setTimeout(() => {
						function clickFarmLinksAgain() {
							const farmLinkB = document.querySelector("#content_value > div.vis.farmGodContent > table > tbody > tr:nth-child(3) > td:nth-child(4) > a");
							const farmLinkA = document.querySelector("#content_value > div.vis.farmGodContent > table > tbody > tr.farmRow.row_a > td:nth-child(4) > a");
							
							if (farmLinkB) {
								farmLinkB.click();
								console.log("Clicou no link de farm B novamente");
								setTimeout(clickFarmLinksAgain, 1000);
								} else if (farmLinkA) {
								farmLinkA.click();
								console.log("Clicou no link de farm A novamente");
								setTimeout(clickFarmLinksAgain, 1000);
								} else {
								const reloadDelay = randomDelay(60000, 120000);
								console.log(`Não há mais links de farm, recarregando a página em ${reloadDelay / 1000} segundos...`);
								setTimeout(() => {
									localStorage.removeItem('rotationPhase');
									location.reload();
								}, reloadDelay);
							}
						}
						
						clickFarmLinksAgain();
						
					}, 10000);
					
				}, 5000);
				
			}, 5000);
			} else {
			// Espera 5 segundos antes de iniciar a rotina de rotação de tropas
			setTimeout(rotacaoTropas, 5000);
		}
	}
	
	verificarElementoEExecutar();
	
	
})();