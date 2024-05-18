function delay(milissegundos) {
    return new Promise(resolve => setTimeout(resolve, milissegundos));
}

async function agendarAtaque() {
    var horarioInicialChegada = $('#date_arrival .relative_time').text().trim().split(" ")[2];
    var horaAtaque = prompt("Por favor, insira a hora do ataque/apoio no formato HH:MM:SS:MS", horarioInicialChegada);
    var partesHoraAtaque = horaAtaque.split(":");
    var milissegundosAtaque = parseInt(partesHoraAtaque[3]);

    while (true) {
        var chegadaSpan = $('#date_arrival .relative_time');
        if (chegadaSpan.length > 0) {
            var chegadaHora = chegadaSpan.text().trim().split(" ")[2];
            
            if (chegadaHora === horaAtaque.split(":").slice(0, -1).join(":")) {
                await delay(milissegundosAtaque);
                $('#troop_confirm_submit').click();
                console.log("Ataque/Apoio enviado!");
                break;
            } else {
                console.log("Horário atual de chegada: " + chegadaHora);
            }
        } else {
            console.log("Aguardando o horário de chegada do ataque...");
        }
        await delay(10); // Verificar a cada 10 milissegundos
    }
}

agendarAtaque();
