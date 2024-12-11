function calcularInvestimento() {
    // Coletando Valores
    const tipo = document.getElementById('tipoInvestimento').value;
    const aporteInicial = parseFloat(document.getElementById('aporteInicial').value);
    const aporteMensal = parseFloat(document.getElementById('aporteMensal').value);
    const prazo = parseInt(document.getElementById('prazo').value);
    const taxaAnual = parseFloat(document.getElementById('taxaAnual').value) / 100;

    // Validando os Valores
    if (aporteInicial < 0 || aporteMensal < 0 || prazo <= 0 || taxaAnual < 0) {
        alert("Por favor, insira valores válidos.");
        return;
    }

    // Criando o loop de cálculo
    let valorFinal = aporteInicial;
    const taxaMensal = Math.pow(1 + taxaAnual, 1 / 12) - 1;

    // Calcular investimentos com base no tipo
    switch (tipo) {
        case 'CDB':
        case 'Tesouro':
            for (let i = 1; i <= prazo; i++) {
                valorFinal += aporteMensal;
                valorFinal *= (1 + taxaMensal); // Juros compostos mensais
            }
            break;
        case 'Poupança':
            const taxaPoupancaMensal = taxaAnual / 12; // Ajuste a taxa mensal da poupança
            for (let i = 1; i <= prazo; i++) {
                valorFinal += aporteMensal; // Adiciona o aporte mensal
                valorFinal += valorFinal * taxaPoupancaMensal; // Simulação de rendimento mensal
            }
            break;
            case 'Fundos de Investimentos':
                const taxaFundosMensal = taxaAnual / 12; // Cálculo para fundos
                for (let i = 1; i <= prazo; i++) {
                    valorFinal += aporteMensal; // Adiciona o aporte mensal
                    valorFinal += valorFinal * taxaFundosMensal; // Simulação de rendimento mensal
                }
                break;
    
            case 'Açoes':
                for (let i = 1; i <= prazo; i++) {
                    valorFinal += aporteMensal; // Adiciona o aporte mensal
                    const variacao = (Math.random() - 0.5) * 0.1; // Volatilidade aleatória
                    valorFinal *= (1 + taxaMensal + variacao); // Ajusta o valor final
                }
                break;    
        default:
            alert("Tipo de investimento não reconhecido.");
            return;
    }

    // Exibe o resultado
    document.getElementById('resultadoFinal').innerText = 
    `Após ${prazo} meses, o valor total será de R$ ${valorFinal.toFixed(2)} com o investimento em ${tipo}.`;
}