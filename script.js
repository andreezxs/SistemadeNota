// Array para armazenar os alunos e suas notas
const alunos = [];

// Função para adicionar um aluno à lista e atualizar a tabela
function adicionarNota() {
    // Obtenha os valores dos campos
    const nomeAluno = document.getElementById('nomeAluno').value;
    const turma = document.getElementById('turma').value;
    const materia = document.getElementById('materia').value;
    const nota = document.getElementById('nota').value;
    const trimestre = document.getElementById('trimestre').value;

    if (nomeAluno && turma && materia && nota && trimestre) {
        // Crie uma nova linha na tabela
        const tabelaNotas = document.getElementById('tabelaNotas');
        const newRow = tabelaNotas.insertRow();

        // Adicione as células na linha
        newRow.insertCell(0).innerHTML = nomeAluno;
        newRow.insertCell(1).innerHTML = turma;
        newRow.insertCell(2).innerHTML = materia;
        newRow.insertCell(3).innerHTML = nota;
        newRow.insertCell(4).innerHTML = trimestre;

        // Adicione uma célula para a ação (botão Excluir)
        const cellAcao = newRow.insertCell(5);
        cellAcao.innerHTML = '<button class="btn-delete" onclick="excluirAluno(this)">Excluir</button>';

        // Adicione o aluno ao array
        const novoAluno = { nomeAluno, turma, materia, nota, trimestre };
        alunos.push(novoAluno);

        // Limpe os campos de entrada
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

    // Obtenha as chaves (nomes das colunas)
    const keys = Object.keys(alunos[0]);
    relatorioContent += keys.join(',') + '\n';

    // Preencha o conteúdo do relatório com os dados dos alunos
    for (const aluno of alunos) {
        const values = keys.map(key => aluno[key]);
        relatorioContent += values.join(',') + '\n';
    }

    // Crie um Blob com o conteúdo do relatório
    const blob = new Blob([relatorioContent], { type: 'text/csv;charset=utf-8;' });

    // Crie um link para download e clique nele automaticamente
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
