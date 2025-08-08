// Variáveis globais para armazenar as instâncias dos gráficos
let chartTotalChamadas = null;
let chartChamadasFeitas = null;

// Função para carregar e processar o CSV
function loadCSV(url) {
    return fetch(url)
        .then(response => response.text()) // Pega o conteúdo do CSV como texto
        .then(csvText => {
            const rows = csvText.split('\n');
            const meses = [];
            const zonas = [];
            const totalChamadas = [];
            const chamadasFeitas = [];

            // Percorre as linhas a partir da segunda (a primeira é o cabeçalho)
            for (let i = 1; i < rows.length; i++) {
                const columns = rows[i].split(','); // Divide cada linha por vírgula
                if (columns.length === 4) { // Verifica se há quatro colunas
                    meses.push(columns[0]); // Adiciona o mês
                    zonas.push(columns[1]); // Adiciona a zona
                    totalChamadas.push(parseFloat(columns[2])); // Total de chamadas
                    chamadasFeitas.push(parseFloat(columns[3])); // Chamadas feitas
                }
            }
            // Calcular a soma total de chamadas
            const totalChamadasSomadas = totalChamadas.reduce((acc, val) => acc + val, 0);
            // Atualizar o quadrado com o total de chamadas
            atualizarTotalChamadas(totalChamadasSomadas);

            return { meses, zonas, totalChamadas, chamadasFeitas }; // Retorna os dados organizados
        })
        .catch(error => {
            console.error('Erro ao carregar o CSV:', error);
        });
}

// Função para gerar o gráfico de Total de Chamadas
function gerarGraficoTotalChamadas(arquivoCSV) {
    loadCSV(arquivoCSV).then(data => {
        console.log(data);
        const ctx = document.getElementById('myChartTotalChamadas').getContext('2d');
        
        // Verifica se já existe um gráfico e o destrói antes de criar outro
        if (chartTotalChamadas) {
            chartTotalChamadas.destroy();
        }

        // Identificar o maior número de chamadas e a zona correspondente
        const maxChamadas = Math.max(...data.totalChamadas); // Maior número de chamadas
        const indexMax = data.totalChamadas.indexOf(maxChamadas); // Índice do maior número
        const zonaMax = data.zonas[indexMax]; // Zona correspondente ao maior número

        // Atualiza o quadrado menor com o maior número e a zona correspondente
        atualizarMaiorChamadas(maxChamadas, zonaMax);

        // Gerar o gráfico
        chartTotalChamadas = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.zonas,
                datasets: [{
                    label: 'Total de Chamadas',
                    data: data.totalChamadas,
                    backgroundColor: '#465338',
                    borderColor: '#465338',
                    borderWidth: 3, // Espessura da borda da barra
                    barThickness: 8 // Espessura da barra
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            color: 'black' // Cor preta no eixo Y
                        }
                    },
                    x: {
                        ticks: {
                            color: 'black' // Cor preta no eixo X
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: 'black' // Cor preta na legenda
                        }
                    }
                }
            }
        });
    });
}

// Função para buscar uma zona e destacar a barra correspondente
function buscarZona() {
    const zonaInput = document.getElementById('zonaInput').value.toLowerCase();
    const arquivoCSV = 'anual.csv'; // Exemplo de arquivo

    loadCSV(arquivoCSV).then(data => {
        // Filtra as zonas que contêm o texto digitado pelo usuário (correspondência parcial)
        const zonasFiltradas = data.zonas.map(zona => zona.toLowerCase().includes(zonaInput) ? zona : null);
        
        // Atualizar o gráfico destacando a barra da zona buscada
        atualizarGrafico(data.zonas, data.totalChamadas, zonaInput, zonasFiltradas);
    }).catch(error => {
        console.error('Erro ao carregar os dados CSV:', error);
    });
}

// Função para atualizar o gráfico e destacar uma ou mais barras específicas
function atualizarGrafico(zonas, chamadas, zonaDestacada, zonasFiltradas) {
    const ctx = document.getElementById('myChartTotalChamadas').getContext('2d');

    // Se já existe um gráfico, destrua-o antes de criar um novo
    if (chartTotalChamadas) {
        chartTotalChamadas.destroy();
    }

    // Define cores padrões e cor de destaque
    const corNormal = '#001E5A'; // Cor padrão para as barras
    const corDestacada = '#FF0000'; // Cor para destacar a zona buscada (alterada para vermelho)

    // Mapeia as cores: se a zona está nas zonas filtradas, usa a cor de destaque, caso contrário, usa a cor normal
    const coresBarras = zonas.map(zona => zonasFiltradas.includes(zona) ? corDestacada : corNormal);

    // Cria um novo gráfico
    chartTotalChamadas = new Chart(ctx, {
        type: 'bar', // Tipo do gráfico
        data: {
            labels: zonas, // Eixo X (Zonas)
            datasets: [{
                label: 'Total de Chamadas', // Legenda
                data: chamadas, // Dados para o gráfico (chamadas)
                backgroundColor: coresBarras, // Define a cor para cada barra
                borderColor: coresBarras, // Cor da borda
                borderWidth: 3 // Largura da borda
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true // Iniciar o eixo Y a partir de zero
                },
                x: {
                    beginAtZero: true // Iniciar o eixo X a partir de zero
                }
            }
        }
    });
}


function atualizarMaiorChamadas(maiorChamadas, zona) {
    const quadradoMenor = document.getElementById('quadradoMenor');
    
    if (quadradoMenor) {
        quadradoMenor.textContent = `${zona}: ${maiorChamadas.toLocaleString('pt-BR')}`;
    } else {
        console.error('Elemento quadradoMenor não encontrado!');
    }
}

function atualizarTotalChamadas(valor) {
    const quadradoTotalChamadas = document.getElementById('quadradoTotalChamadas');

    if (quadradoTotalChamadas) {
        quadradoTotalChamadas.textContent = `${valor.toLocaleString('pt-BR')}`;
    } else {
        console.error('Elemento quadradoTotalChamadas não encontrado!');
    }
}

// Chamar as funções para gerar os gráficos de cada mês
function gerarRelatoriosMensais() {
    const meses = ['janeiro.csv','fevereiro.csv','marco.csv','abril.csv','maio.csv','junho.csv','julho.csv','agosto.csv','setembro.csv','outubro.csv','Anual.csv'];
    
    meses.forEach(mes => {
        gerarGraficoTotalChamadas(mes);
    });
}

// Exemplo de como chamar a função para gerar os relatórios para todos os meses
gerarRelatoriosMensais();
