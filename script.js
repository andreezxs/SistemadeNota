// Array para armazenar os alunos e suas notas
const alunos = [];

// Função para adicionar um aluno à lista e atualizar a tabela
function adicionarNota() {
    const nomeAluno = document.getElementById('nomeAluno').value;
    const turma = document.getElementById('turma').value;
    const materia = document.getElementById('materia').value;
    const nota = document.getElementById('nota').value;
    const trimestre = document.getElementById('trimestre').value;

    if (nomeAluno && turma && materia && nota && trimestre) {
        const novoAluno = { nomeAluno, turma, materia, nota, trimestre };
        alunos.push(novoAluno);

        const tabelaNotas = document.getElementById('tabelaNotas');
        const newRow = tabelaNotas.insertRow();

        const keys = Object.keys(novoAluno);

        keys.forEach((key, index) => {
            const cell = newRow.insertCell(index);
            cell.innerHTML = novoAluno[key];
        });

        const cellAcao = newRow.insertCell(keys.length);
        cellAcao.innerHTML = '<button class="btn-delete" onclick="excluirAluno(this)">Excluir</button>';

        limparCampos();
    }
}

// Função para excluir um aluno da lista e da tabela
function excluirAluno(button) {
    const row = button.parentNode.parentNode;
    const rowIndex = row.rowIndex - 1;
    alunos.splice(rowIndex, 1);
    row.parentNode.removeChild(row);
}

// Função para gerar o relatório de notas
function gerarRelatorio() {
    if (alunos.length === 0) {
        alert('Não há alunos para gerar o relatório.');
        return;
    }

    let relatorioContent = '';

    const keys = Object.keys(alunos[0]);
    relatorioContent += keys.join(',') + '\n';

    for (const aluno of alunos) {
        const values = keys.map(key => aluno[key]);
        relatorioContent += values.join(',') + '\n';
    }

    const blob = new Blob([relatorioContent], { type: 'text/csv;charset=utf-8;' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'relatorio_notas.csv';
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Função para limpar os campos de entrada após adicionar um aluno
function limparCampos() {
    document.getElementById('nomeAluno').value = '';
    document.getElementById('turma').value = '';
    document.getElementById('materia').value = '';
    document.getElementById('nota').value = '';
    document.getElementById('trimestre').value = '';
}
