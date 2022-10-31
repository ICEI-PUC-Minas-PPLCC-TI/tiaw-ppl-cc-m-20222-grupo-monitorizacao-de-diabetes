if (localStorage.getItem('contador') == null) {
    var contador = 0;
    localStorage.setItem('contador', contador);
    console.log("O contador era null, agora é 0");
} else {
    contador = localStorage.getItem('contador');
    console.log("O contador era " + contador);
}

window.onload = () => {
    let today = new Date().toISOString().slice(0, 10);
    let hora = new Date().toLocaleTimeString('pt-BR', { hour12: false, hour: "numeric", minute: "numeric" });
    let glicemiaPermite = false;
    let horarioPermite = false;
    let dataPermite = false;
    let jejumPermite = false;
    function limpar() {
        glicemia.value = ''
        data.value = today;
        horario.value = hora;
        jejum.value = 'jejum'
    }

    const tabela = document.getElementById('tabela')
    const glicemia = document.getElementById('glicemia')
    const horario = document.getElementById('horario')
    const data = document.getElementById('data')
    const jejum = document.getElementById('jejum')
    const submitB = document.getElementById('submitB')
    const resetB = document.getElementById('resetB')
    if (localStorage.getItem('medida') == null) {
        var medida = [{ "id": 0, "data": "2022-10-22", "horario": "21:30", "glicemia": "120", "jejum": "pós-prandial"}, { "id": 1, "data": "2022-10-23", "horario": "06:05", "glicemia": "80", "jejum": "jejum" }, { "id": 2, "data": "2022-10-23", "horario": "07:30", "glicemia": "140", "jejum": "pós-prandial" }];
        console.log("A medida era null, agora é " + `${JSON.stringify(medida)}`);
        localStorage.setItem('medida', JSON.stringify(medida));
    } else {
        medida = JSON.parse(localStorage.getItem('medida'));
        console.log("A medida era " + `${JSON.stringify(medida)}`);
        // medida.sort(function (a, b) { // ainda não entendi como funciona, não é necessária por agora e ainda atrapalha a função do botão de apagar última medida
        //     return new Date(b.data + " " + b.horario) - new Date(a.data + " " + a.horario); // 
        // });
    }
    atualizar();

    function atualizar() {
        tabela.innerHTML = '' // for é melhor que forEach para colocar as últimas medidas em cima (adicionando usando push)
        for (let i = (medida.length-1); i >= 0; i--) { // mudar pra i < 5 se quiser ver só as 5 últimas medidas sem usar CSS
            tabela.innerHTML +=
                `<tr>
                <td>${medida[i].data}</td>
                <td>${medida[i].horario}</td>
                <td>${medida[i].glicemia}</td>
                <td>${medida[i].jejum}</td>
            </tr>`
        }
    }

    submitB.addEventListener('click', function (evento) {
        evento.preventDefault()
        checaGlicemia(); checaHorario(); checaData(); checaJejum();
        if (glicemiaPermite && horarioPermite && dataPermite && jejumPermite) {
            medida.push({
                id: Number(contador),
                data: data.value,
                horario: horario.value,
                glicemia: glicemia.value,
                jejum: jejum.value
            })
            window.localStorage.setItem("medida_" + `${contador}`, `${contador}`);
            window.localStorage.setItem("glicemia" + "_id_" + `${contador}`, glicemia.value);
            window.localStorage.setItem("horario" + "_id_" + `${contador}`, horario.value);
            window.localStorage.setItem("data" + "_id_" + `${contador}`, data.value);
            window.localStorage.setItem("jejum" + "_id_" + `${contador}`, Boolean((jejum.value) == "jejum"));
            contador++;
            window.localStorage.setItem("contador", contador.valueOf());
            window.localStorage.setItem("medida", JSON.stringify(medida));
            // medida.sort(function (a, b) { // ainda não entendi como funciona, não é necessária por agora e ainda atrapalha a função do botão de apagar última medida
            //     return new Date(b.data + " " + b.horario) - new Date(a.data + " " + a.horario); // 
            // });
            atualizar()
            limpar();
            alert("Registro salvo.");
        } else {
            alert('Favor preencher corretamente todos os campos!')
        }
    })

    limpar();

    function checaGlicemia() {
        if (glicemia.value > 0 && glicemia.value != '') {
            glicemiaPermite = true;
            return glicemiaPermite;
        } else {
            glicemiaPermite = false;
            return glicemiaPermite;
        }
    }
    function checaHorario() {
        if (horario.value != '') {
            horarioPermite = true;
            return horarioPermite;
        } else {
            horarioPermite = false;
            return horarioPermite;
        }
    }
    function checaData() {
        if (data.value != '') {
            dataPermite = true;
            return dataPermite;
        } else {
            dataPermite = false;
            return dataPermite;
        }
    }
    function checaJejum() {
        if (jejum.value == '') {
            jejumPermite = false;
            return jejumPermite;
        } else {
            jejumPermite = true;
            return jejumPermite;
        }
    }
    glicemia.onchange = () => { checaGlicemia(); }
    horario.onchange = () => { checaHorario(); }
    data.onchange = () => { checaData(); }
    jejum.onchange = () => { checaJejum(); }

    resetB.addEventListener('click', function (evento) {
        evento.preventDefault()
        glicemia.value = ''
        horario.value = ''
        data.value = ''
        jejum.value = ''
    })

    apagaB.addEventListener('click', function (evento) {
        evento.preventDefault();
        medida.pop();
        atualizar();
        alert("Registro apagado.");
    })
}