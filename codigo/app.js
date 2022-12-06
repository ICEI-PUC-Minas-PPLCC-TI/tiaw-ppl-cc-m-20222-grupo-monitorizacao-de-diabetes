onload = () => {

    let g = []
    let r = []
    let m = []
    let i = []

    var glicemiaCompleta = JSON.parse(localStorage.getItem('glicemia'));
    var refeicoesCompleta = JSON.parse(localStorage.getItem('refeicoes'));
    var remediosCompleta = JSON.parse(localStorage.getItem('remedios'));
    var insulinaCompleta = JSON.parse(localStorage.getItem('insulina'));

    

    if (glicemiaCompleta == null) {
        localStorage.setItem('glicemia', JSON.stringify(g));
        glicemiaCompleta = [];
    }

    if (refeicoesCompleta == null) {
        localStorage.setItem('refeicoes', JSON.stringify(r));
        refeicoesCompleta = [];
    }

    if (remediosCompleta == null) {
        localStorage.setItem('remedios', JSON.stringify(m));
        remediosCompleta = [];
    }

    if (insulinaCompleta == null) {
        localStorage.setItem('insulina', JSON.stringify(i));
        insulinaCompleta = [];
    }


    glicemiaCompleta.sort(function (a, b) {
        return a.x - b.x;
    });

    refeicoesCompleta.sort(function (a, b) {
        return a.x - b.x;
    });


    remediosCompleta.sort(function (a, b) {
        return a.x - b.x;
    });


    insulinaCompleta.sort(function (a, b) {
        return a.x - b.x;
    });

    let utc = new Date().toDateString()

    const hojeInicio = new Date(utc);
    const hojeFim = new Date(parseInt(Date.parse(hojeInicio.toDateString()))+ 86399000) 

    // var de = parseInt(Date.parse(hojeInicio.toDateString()));
    // var ate = parseInt(Date.parse(hojeFim.toDateString())) + 86399000;

    
    var de = hojeInicio.valueOf();
    var ate = hojeFim.valueOf();


    let glicemia = '['

    for (var k in glicemiaCompleta) {
        if (glicemiaCompleta[k].x >= de && glicemiaCompleta[k].x <= ate) {
            glicemia += `{"x":${glicemiaCompleta[k].x},"y":${glicemiaCompleta[k].y}},`
        }
    }

    if (glicemia.length > 1)
        glicemia = glicemia.substr(0, glicemia.length - 1);
    glicemia += ']';
    var glicemiaJSON = JSON.parse(glicemia);

    //-------------------------------------------------//

    let refeicoes = '['

    for (var k in refeicoesCompleta) {
        if (refeicoesCompleta[k].x >= de && refeicoesCompleta[k].x <= ate) {
            refeicoes += `{"x":${refeicoesCompleta[k].x},"y":${refeicoesCompleta[k].y}},`
        }
    }

    if (refeicoes.length > 1)
        refeicoes = refeicoes.substr(0, refeicoes.length - 1);
    refeicoes += ']';
    let refeicoesJSON = JSON.parse(refeicoes);

    //-------------------------------------------------//

    let remedios = '['

    for (var k in remediosCompleta) {
        if (remediosCompleta[k].x >= de && remediosCompleta[k].x <= ate) {
            remedios += `{"x":${remediosCompleta[k].x},"y":${remediosCompleta[k].y}},`
        }
    }

    if (remedios.length > 1)
        remedios = remedios.substr(0, remedios.length - 1);
    remedios += ']';
    let remediosJSON = JSON.parse(remedios);

    //-------------------------------------------------//

    let insulina = '['

    for (var k in insulinaCompleta) {
        if (insulinaCompleta[k].x >= de && insulinaCompleta[k].x <= ate) {
            insulina += `{"x":${insulinaCompleta[k].x},"y":${insulinaCompleta[k].y}},`
        }
    }

    if (insulina.length > 1)
        insulina = insulina.substr(0, insulina.length - 1);
    insulina += ']';
    let insulinaJSON = JSON.parse(insulina);

    //-------------------------------------------------//


    var myChart = new Chart("myChart", {
        data: {
            datasets: [
                {
                    type: 'line',
                    label: 'Glicemia',
                    lineTension: 0.2,
                    backgroundColor: "rgba(255,0,0,1.0)",
                    borderColor: "rgba(255,0,0,1)",
                    data: glicemiaJSON
                },
                {
                    type: 'scatter',
                    label: 'Refeições',
                    lineTension: 0,
                    backgroundColor: "rgba(0,255,0,1.0)",
                    borderColor: "rgba(0,255,0,1)",
                    data: refeicoesJSON,
                    pointStyle: 'rect'
                },
                {
                    type: 'scatter',
                    label: 'Remédios',
                    lineTension: 0,
                    backgroundColor: "rgba(0,0,255,1.0)",
                    borderColor: "rgba(0,0,255,1)",
                    data: remediosJSON,
                },
                {
                    type: 'scatter',
                    label: 'Insulina',
                    lineTension: 0,
                    backgroundColor: "rgba(255,0,255,1.0)",
                    borderColor: "rgba(255,0,255,1)",
                    data: insulinaJSON,
                },

            ]
        },
        options: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Glicose'
            },
            scales: {
                x: {
                    grid: {
                        display: true,
                        drawBorder: true,
                        drawOnChartArea: true,
                        drawTicks: true,
                    },
                    type: 'time',
                    ticks: {
                        source: 'data'
                    },
                    title: {
                        display: true,
                        text: 'Data'
                    }
                },
                y: {
                    min: 0,
                    max: 500,
                    title: {
                        display: true,
                        text: 'mg/dl'
                    },
                    grid: {
                        lineWidth: 1,
                        drawBorder: false,
                        color: function (context) {
                            if (context.tick.value > 150) {
                                return 'rgba(0, 0, 0, 1)';
                            } else if (context.tick.value < 50) {
                                return 'rgba(0, 0, 0, 1)';
                            }

                            return 'rgba(0, 255, 0, 1)';
                        },
                    },
                },
            }
        },
    });

    var perfil = JSON.parse(localStorage.getItem('user'));

    if(perfil == null){
        let perfilMock = '{"id":0,"nomeCompleto":"Sandra de Freitas","tipo":"Mellitus Tipo 2","dataNasc":"1967-06-08","email":"sandrafreitas@gmail.com", "metformina": "checked", "pioglitazona": "checked", "miglitol": "checked", "glimepirida": "checked"}';
        localStorage.setItem('user', perfilMock);
        perfil = JSON.parse(localStorage.getItem('user'));
    }
        
    let perfilCard = document.getElementById('dadosdoPerfil');

    perfilCard.innerHTML = `<div class="row">
    <div class="col-12">
        <div class="input-group mb-3">
            <span class="input-group-text">Nome</span>
            <input type="text" class="form-control" value="${perfil.nomeCompleto}" id="nomePerfil" disabled>
        </div>
    </div>

    <div class="col-12">
        <div class="input-group mb-3">
            <span class="input-group-text">Data de Nascimento</span>
            <input type="date" class="form-control" id="nasc" value="${perfil.dataNasc}" disabled>
        </div>
    </div>

    <div class="col-12">
        <div class="input-group mb-3">
            <span class="input-group-text">Diabetes</span>
            <input type="text" class="form-control" id="tipoDiabetes" value="${perfil.tipo}" disabled>
        </div>
    </div>

    <div class="col-12">
        <div class="input-group mb-3">
            <span class="input-group-text">E-mail</span>
            <input type="text" class="form-control" id="email" value="${perfil.email}" disabled>
        </div>
    </div>

    <div class="col-12">
        <div class="card-header">Remédios</div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">
                <input class="form-check-input" type="checkbox" id="metformina" disabled ${perfil.metformina}>
                <label class="form-check-label" for="metformina">Metformina</label>
            </li>

            <li class="list-group-item">
                <input class="form-check-input" type="checkbox" id="glimepirida" disabled ${perfil.glimepirida}>
                <label class="form-check-label" for="glimepirida">Glimepirida</label>
            </li>

            <li class="list-group-item">                
                <input class="form-check-input" type="checkbox" id="miglitol" disabled ${perfil.miglitol}>
                <label class="form-check-label" for="miglitol">Miglitol</label>
            </li>

            <li class="list-group-item">                
                <input class="form-check-input" type="checkbox" id="pioglitazona" disabled ${perfil.pioglitazona}>
                <label class="form-check-label" for="pioglitazona">Pioglitazona</label>
            </li>
        </ul>
    </div>
        <button type="button" class="btn btn-primary" id="btnEditarPerfil">Editar</button>
        <button type="button" class="btn btn-primary" id="btnSalvarPerfil" disabled>Salvar</button>
</div>`


    $(function () {
        var dateFormat = "mm/dd/yy";

        dataInicial = $("#dataInicial")
            .datepicker({
                defaultDate: "+1w",
                changeMonth: true,
            })
            .on("change", function () {
                dataFinal.datepicker("option", "minDate", getDate(this));
            }),

            dataFinal = $("#dataFinal").datepicker({
                defaultDate: "+1w",
                changeMonth: true,
            })
                .on("change", function () {
                    dataInicial.datepicker("option", "maxDate", getDate(this));
                });

        function getDate(element) {
            var date;
            try {
                date = $.datepicker.parseDate(dateFormat, element.value);
            } catch (error) {
                date = null;
            }
            return date;
        }

        $("#btnFiltro").click(function () {

            myChart.data.datasets[0].data = getValuesFromFilter(glicemiaCompleta);
            myChart.data.datasets[1].data = getValuesFromFilter(refeicoesCompleta);
            myChart.data.datasets[2].data = getValuesFromFilter(remediosCompleta);
            myChart.data.datasets[3].data = getValuesFromFilter(insulinaCompleta);

            myChart.update();

        })

        function getValuesFromFilter(dComplete) {
            let i = document.getElementById("dataInicial").value;
            let f = document.getElementById("dataFinal").value;

            i = parseInt(Date.parse(i));
            f = parseInt(Date.parse(f)) - 1000;
            let filtered = '['
            for (var k in dComplete) {
                if (dComplete[k].x >= i && dComplete[k].x <= f) {
                    filtered += `{"x":${dComplete[k].x},"y":${dComplete[k].y}},`
                }
            }

            if (filtered.length > 1)
                filtered = filtered.substr(0, filtered.length - 1);
            filtered += ']';

            return JSON.parse(filtered);
        }


    });

    (function () {
        'use strict'
        var forms = document.querySelectorAll('.formMedidas')
        Array.prototype.slice.call(forms)
            .forEach(function (form) {
                form.addEventListener('submit', function (event) {
                    if (!form.checkValidity()) {
                        event.preventDefault()
                        event.stopPropagation()
                    }
                    form.classList.add('was-validated')
                }, false)
            })
    })()

    $("#btnSave").click(function () {

        let tipo = document.getElementById("tipoMedida").value;
        let qntd = document.getElementById("addMedida").value;
        let dia = document.getElementById("addDia").value;
        let hora = document.getElementById("addHora").value;

        let data = new Date(dia + " " + hora);

        data = data.getTime();

        let novaMedida = JSON.parse(`{"x":${data}, "y": ${qntd}}`);

        switch (tipo) {
            case 'g':
                g = JSON.parse(localStorage.getItem('glicemia'));
                g.push(novaMedida);
                localStorage.setItem('glicemia', JSON.stringify(g));
                break;

            case 'r':
                r = JSON.parse(localStorage.getItem('refeicoes'));
                r.push(novaMedida);
                localStorage.setItem('refeicoes', JSON.stringify(r));
                break;

            case 'm':
                m = JSON.parse(localStorage.getItem('remedios'));
                m.push(novaMedida);
                localStorage.setItem('remedios', JSON.stringify(m));
                break;

            case 'i':
                i = JSON.parse(localStorage.getItem('insulina'));
                i.push(novaMedida);
                localStorage.setItem('insulina', JSON.stringify(i));
                break;

            default:
                break;
        }

        console.log(glicemiaJSON)

        myChart.update();
        modal.modal('hide');
        console.log("text")
    })

    $('#btnEditarPerfil').click(function () {
        document.getElementById("nomePerfil").toggleAttribute("disabled")
        document.getElementById("nasc").toggleAttribute("disabled")
        document.getElementById("tipoDiabetes").toggleAttribute("disabled")
        document.getElementById("email").toggleAttribute("disabled")
        document.getElementById("metformina").toggleAttribute("disabled")
        document.getElementById("glimepirida").toggleAttribute("disabled")
        document.getElementById("miglitol").toggleAttribute("disabled")
        document.getElementById("pioglitazona").toggleAttribute("disabled")

        document.getElementById("btnEditarPerfil").toggleAttribute("disabled")
        document.getElementById("btnSalvarPerfil").toggleAttribute("disabled")

    })

    $('#btnSalvarPerfil').click(function () {


        perfil.nomeCompleto = document.getElementById("nomePerfil").value;
        perfil.dataNasc = document.getElementById("nasc").value;
        perfil.tipo = document.getElementById("tipoDiabetes").value;
        perfil.email = document.getElementById("email").value;

        if (document.getElementById("metformina").checked)
            perfil.metformina = "checked";
        else
            perfil.metformina = "";

        if (document.getElementById("pioglitazona").checked)
            perfil.pioglitazona = "checked";
        else
            perfil.pioglitazona = "";

        if (document.getElementById("miglitol").checked)
            perfil.miglitol = "checked";
        else
            perfil.miglitol = "";

        if (document.getElementById("glimepirida").checked)
            perfil.glimepirida = "checked";
        else
            perfil.glimepirida = "";

        localStorage.setItem('user', JSON.stringify(perfil));

        document.getElementById("nomePerfil").toggleAttribute("disabled")
        document.getElementById("nasc").toggleAttribute("disabled")
        document.getElementById("tipoDiabetes").toggleAttribute("disabled")
        document.getElementById("email").toggleAttribute("disabled")
        document.getElementById("metformina").toggleAttribute("disabled")
        document.getElementById("glimepirida").toggleAttribute("disabled")
        document.getElementById("miglitol").toggleAttribute("disabled")
        document.getElementById("pioglitazona").toggleAttribute("disabled")

        document.getElementById("btnEditarPerfil").toggleAttribute("disabled")
        document.getElementById("btnSalvarPerfil").toggleAttribute("disabled")


    })
}
