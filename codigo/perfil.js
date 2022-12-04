    const nomeCompleto = document.getElementById ('campoNome')
    const Tipo = document.getElementById ('campoTipo')
    const Genero = document.getElementById ('campoGenero')
    const dataNasc = document.getElementById ('dataNasc')
    const Email = document.getElementById ('emailPessoal')
    const EmailMedico = document.getElementById ('emailMedico')
    const Remedio = document.getElementById ('remedio')
    const faixaAlvoA = document.getElementById ('faixaAlvoA')
    const faixaAlvoB = document.getElementById ('faixaAlvoB')

    if (localStorage.getItem('db') == null) {
        var usuario = [{"id":0, 
        "nomeCompleto": "Sandra de Freitas", 
        "tipo": "Diabetes tipo 2", 
        "genero": "Feminino", 
        "dataNasc": "06/08/1967",
        "remedio": "remedio", 
        "email": "sandrafreitas@gmail.com", 
        "emailMedico": "medico@gmail.com", 
        "faixaAlvoA": "99mg/dL", 
        "faixaAlvoB":"180mg/dL",
                    }]
        localStorage.setItem('db', JSON.stringify(usuario));  
    }

    else {
        db = JSON.parse(localStorage.getItem('db'));
    }

    function editarDados () {
        
        let dadosAltera = document.getElementById('dadosdoPerfil');

            let novoUsuario = ({
            nomeCompleto: document.getElementById ('nomeCompleto').value,
            tipo: document.getElementById ('tipo').value,
            genero: document.getElementById ('genero').value,
            dataNasc: document.getElementById ('dataNasc').value,
            email: document.getElementById ('emailPessoal').value, 
            emailMedico: document.getElementById ('emailMedico').value,
            remedio: document.getElementById ('remedio').value,
            faixaAlvoA: document.getElementById ('faixaAlvoA').value,
            faixaAlvoB: document.getElementById ('faixaAlvoB').value,
        })

        localStorage.setItem('db', JSON.stringify(novoUsuario));

        dadosAltera = ``

        alert('Dados alterados com sucesso!');

    }

    //botão 
document.getElementById ('btnsalvarDados').addEventListener ('click', editarDados);


