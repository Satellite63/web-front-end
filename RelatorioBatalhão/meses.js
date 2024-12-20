// Variáveis globais para armazenar as instâncias dos gráficos
let chartTotalChamadas = null;

// Função para carregar e processar o CSV
function loadCSV(url) {
    return fetch(url)
        .then(response => response.text()) // Pega o conteúdo do CSV como texto
        .then(csvText => {
            const rows = csvText.split('\n');
            const CODIGO = [];
            const GSSI = [];
            const totalChamadas = [];

            // Percorre as linhas a partir da segunda (a primeira é o cabeçalho)
            for (let i = 1; i < rows.length; i++) {
                const columns = rows[i].split(','); // Divide cada linha por vírgula
                if (columns.length === 3) { // Verifica se há três colunas
                    const chamadas = parseFloat(columns[2]);
                    if (chamadas > 1000) { // Filtra chamadas acima de 1000
                        CODIGO.push(columns[0]); // Adiciona o código
                        GSSI.push(columns[1]); // Adiciona o GSSI
                        totalChamadas.push(chamadas); // Adiciona o total de chamadas
                    }
                }
            }
            // Calcular a soma total de chamadas (apenas chamadas > 1000)
            const totalChamadasSomadas = totalChamadas.reduce((acc, val) => acc + val, 0);
            atualizarTotalChamadas(totalChamadasSomadas);

            return { CODIGO, GSSI, totalChamadas }; // Retorna os dados organizados
        })
        .catch(error => {
            console.error('Erro ao carregar o CSV:', error);
        });
}

// Função para gerar o gráfico de Total de Chamadas
function gerarGraficoTotalChamadas(arquivoCSV) {
    loadCSV(arquivoCSV).then(data => {
        const ctx = document.getElementById('myChartTotalChamadas').getContext('2d');
        
        if (chartTotalChamadas) {
            chartTotalChamadas.destroy();
        }

        // Identificar o maior número de chamadas e o GSSI correspondente
        const maxChamadas = Math.max(...data.totalChamadas);
        const indexMax = data.totalChamadas.indexOf(maxChamadas);
        const GSSIMax = data.GSSI[indexMax];
        atualizarMaiorChamadas(maxChamadas, GSSIMax);

        // Gerar o gráfico
        chartTotalChamadas = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.GSSI,
                datasets: [{
                    label: 'Total de Chamadas',
                    data: data.totalChamadas,
                    backgroundColor: '#001E5A',
                    borderColor: '#001E5A',
                    borderWidth: 1,
                    barThickness: 6
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: { color: 'black' }
                    },
                    x: {
                        ticks: { color: 'black' }
                    }
                },
                plugins: {
                    legend: {
                        labels: { color: 'black' }
                    }
                }
            }
        });
    });
}

// Função para atualizar o quadrado menor com o maior número de chamadas
function atualizarMaiorChamadas(maiorChamadas, GSSI) {
    const quadradoMenor = document.getElementById('quadradoMenor');
    if (quadradoMenor) {
        quadradoMenor.textContent = `${GSSI}: ${maiorChamadas.toLocaleString('pt-BR')}`;
    } else {
        console.error('Elemento quadradoMenor não encontrado!');
    }
}

// Função para atualizar o quadrado com o total de chamadas
function atualizarTotalChamadas(valor) {
    const quadradoTotalChamadas = document.getElementById('quadradoTotalChamadas');
    if (quadradoTotalChamadas) {
        quadradoTotalChamadas.textContent = `${valor.toLocaleString('pt-BR')}`;
    } else {
        console.error('Elemento quadradoTotalChamadas não encontrado!');
    }
}

// Exemplo de como chamar a função para gerar o relatório
gerarGraficoTotalChamadas('anual.csv');
