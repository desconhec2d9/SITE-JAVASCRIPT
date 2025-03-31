 // Executa o código após o carregamento do DOM
 document.addEventListener('DOMContentLoaded', () => {
    const botaoAdicionar = document.getElementById('adicionar');
    const container = document.getElementById('container');
    const nota1Input = document.getElementById('nota1Input');
    const nota2Input = document.getElementById('nota2Input');
    const nota3Input = document.getElementById('nota3Input');
    const nota4Input = document.getElementById('nota4Input');
    const materiaInput = document.getElementById('materiaInput');
    const alunoInput = document.getElementById('alunoInput');
    const totalDiv = document.getElementById('total');
    const mensagemFinalDiv = document.getElementById('mensagemFinal');
    const notasPorMateria = {};

    // Função para adicionar notas
    function adicionarNotas(aluno, materia, nota1, nota2, nota3, nota4) {
        if (!notasPorMateria[aluno]) {
            notasPorMateria[aluno] = {};
        }
        notasPorMateria[aluno][materia] = [parseFloat(nota1), parseFloat(nota2), parseFloat(nota3), parseFloat(nota4)];

        const novaDiv = document.createElement('div');
        const textoNota = document.createTextNode(`Aluno ${aluno} - ${materia} - Notas: ${notasPorMateria[aluno][materia].join(', ')}`);
        
        const botaoDelete = document.createElement('button');
        botaoDelete.textContent = 'X';
        botaoDelete.setAttribute('class', 'delete');
        botaoDelete.addEventListener('click', () => {
            container.removeChild(novaDiv);
            delete notasPorMateria[aluno][materia];
            atualizarMedia(aluno, materia);
        });

        novaDiv.appendChild(textoNota);
        novaDiv.appendChild(botaoDelete);
        novaDiv.setAttribute('class', 'nota');
        container.appendChild(novaDiv);

        atualizarMedia(aluno, materia);
    }

    function atualizarMedia(aluno, materia) {
        const notas = notasPorMateria[aluno][materia];
        if (notas.length === 4) {
            let soma = notas.reduce((a, b) => a + b, 0);
            let media = (soma / 4).toFixed(2);
            verificarSituacao(aluno, media);
            totalDiv.innerText = `Média de ${materia} do aluno ${aluno}: ${media}`;
        } else {
            totalDiv.innerText = "Média aguardando notas";
        }
    }

    function verificarSituacao(aluno, media) {
        if (media < 5) {
            mensagemFinalDiv.innerText = `${aluno}, vou ver você aqui ano que vem!`;
        } else if (media >= 5 && media < 7) {
            mensagemFinalDiv.innerText = `${aluno}, não vai entrar de férias tão cedo.`;
        } else if (media >= 7) {
            mensagemFinalDiv.innerText = `${aluno}, parabéns pela dedicação!`;
        } else {
            mensagemFinalDiv.innerText = "";
        }
    }

    botaoAdicionar.addEventListener('click', () => {
        const aluno = alunoInput.value;
        const materia = materiaInput.value;
        const nota1 = nota1Input.value;
        const nota2 = nota2Input.value;
        const nota3 = nota3Input.value;
        const nota4 = nota4Input.value;

        if (aluno && materia && !isNaN(nota1) && !isNaN(nota2) && !isNaN(nota3) && !isNaN(nota4)) {
            adicionarNotas(aluno, materia, nota1, nota2, nota3, nota4);
            
            alunoInput.value = '';
            materiaInput.value = '';
            nota1Input.value = '';
            nota2Input.value = '';
            nota3Input.value = '';
            nota4Input.value = '';
        } else {
            alert('Por favor, digite o nome do aluno, uma matéria e valores numéricos para todas as notas!');
        }
    });
});