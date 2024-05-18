// Colar código no console na página de cancelar ataque
// Função snipar com hora marcada
// Coletar o horário que deseja defender

 var horaAtaque = prompt("Por favor, insira a hora do ataque no formato HH:MM:SS:");

// Função para obter o horário do servidor no formato HH:MM:SS
function obterHorarioServidor() {
    var horarioServidorElement = document.querySelector("#serverTime");
    if (horarioServidorElement) {
        return horarioServidorElement.textContent.trim();
    } else {
        console.log("Elemento do horário do servidor não encontrado.");
        return null;
    }
}

// Função para calcular o horário de cancelamento
function calcularHorarioCancelamento(horarioAtaque, tempoViagem) {
    var partesHorarioAtaque = horarioAtaque.split(":");
    var partesTempoViagem = tempoViagem.split(":");

    var horarioAtaqueEmSegundos = parseInt(partesHorarioAtaque[0]) * 3600 + parseInt(partesHorarioAtaque[1]) * 60 + parseInt(partesHorarioAtaque[2]);
    var tempoViagemEmSegundos = parseInt(partesTempoViagem[0]) * 3600 + parseInt(partesTempoViagem[1]) * 60 + parseInt(partesTempoViagem[2]);

    var horarioCancelamentoEmSegundos = horarioAtaqueEmSegundos - tempoViagemEmSegundos - 1; // Subtrair 1 segundos

    var horas = Math.floor(horarioCancelamentoEmSegundos / 3600);
    var minutos = Math.floor((horarioCancelamentoEmSegundos % 3600) / 60);
    var segundos = horarioCancelamentoEmSegundos % 60;

    return formatarTempo({ horas: horas, minutos: minutos, segundos: segundos });
}


function calcularTempoViagem() {
    var chegadaSpan = document.querySelector("#content_value > table:nth-child(2) > tbody > tr:nth-child(8) > td:nth-child(2) > span");
    var duracaoAtaqueElement = document.querySelector("#content_value > table:nth-child(2) > tbody > tr:nth-child(6) > td:nth-child(2)");
    
    if (chegadaSpan && duracaoAtaqueElement) {
        var chegadaHora = chegadaSpan.textContent.trim();
        var duracaoAtaqueTexto = duracaoAtaqueElement.textContent.trim();
        
        var duracaoAtaqueSegundos = extrairDuracao(duracaoAtaqueTexto);

        var tempoViagem = calcularTempoViagemEmSegundos(chegadaHora, duracaoAtaqueSegundos);
        var tempoViagemFormatado = formatarTempo(tempoViagem);
        
       // console.log("Hora de chegada:", chegadaHora);
        //console.log("Duração do ataque:", duracaoAtaqueTexto);
        console.log("Tempo de viagem:", tempoViagemFormatado);

        // Calcular o horário de cancelamento
    var horarioCancelamento = calcularHorarioCancelamento(horaAtaque, tempoViagemFormatado);

    // Comparar o horário do servidor com o horário de cancelamento
    var horarioServidor = obterHorarioServidor();
    if (horarioServidor === horarioCancelamento) {
        var botaoRetornar = document.querySelector("#content_value > table:nth-child(2) > tbody > tr:nth-child(10) > td > a");
        if (botaoRetornar) {
            botaoRetornar.click();
        }
    }
    } else {
        console.log("Elementos não encontrados.");
    }
}

function extrairDuracao(duracaoTexto) {
    var partes = duracaoTexto.split(":");
    var horas = parseInt(partes[0]) || 0;
    var minutos = parseInt(partes[1]) || 0;
    var segundos = parseInt(partes[2]) || 0;

    return horas * 3600 + minutos * 60 + segundos;
}

function calcularTempoViagemEmSegundos(chegadaHora, duracaoAtaqueSegundos) {
    var partesChegada = chegadaHora.split(":");
    var horasChegada = parseInt(partesChegada[0]) || 0;
    var minutosChegada = parseInt(partesChegada[1]) || 0;
    var segundosChegada = parseInt(partesChegada[2]) || 0;

    var duracaoAtaqueHoras = Math.floor(duracaoAtaqueSegundos / 3600);
    var duracaoAtaqueMinutos = Math.floor((duracaoAtaqueSegundos % 3600) / 60);
    var duracaoAtaqueSegundos = duracaoAtaqueSegundos % 60;

    var horasViagem = duracaoAtaqueHoras - horasChegada;
    var minutosViagem = duracaoAtaqueMinutos - minutosChegada;
    var segundosViagem = duracaoAtaqueSegundos - segundosChegada;

    if (segundosViagem < 0) {
        segundosViagem += 60;
        minutosViagem--;
    }
    if (minutosViagem < 0) {
        minutosViagem += 60;
        horasViagem--;
    }
    if (horasViagem < 0) {
        horasViagem += 24;
    }

    return { horas: horasViagem, minutos: minutosViagem, segundos: segundosViagem };
}



function formatarTempo(tempo) {
    return tempo.horas.toString().padStart(2, '0') + ":" + tempo.minutos.toString().padStart(2, '0') + ":" + tempo.segundos.toString().padStart(2, '0');
}

setInterval(calcularTempoViagem, 10);
