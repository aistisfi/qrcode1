// Simula recomendações de IA baseadas nas informações fornecidas
document.addEventListener('DOMContentLoaded', function() {
    const recommendationsBtn = document.getElementById('get-recommendations');
    const descriptionInput = document.getElementById('ai-description');
    const recommendationsResult = document.getElementById('recommendations-result');
    
    recommendationsBtn.addEventListener('click', function() {
        const description = descriptionInput.value.trim();
        
        if (!description) {
            recommendationsResult.innerHTML = '<p class="error">Por favor, descreva sua propriedade para receber recomendações.</p>';
            return;
        }
        
        // Simula processamento
        recommendationsResult.innerHTML = '<p><i class="fas fa-spinner fa-spin"></i> Analisando sua propriedade...</p>';
        
        setTimeout(() => {
            // Análise simples baseada em palavras-chave
            const keywords = {
                'seca': 'Sistema de captação de água da chuva',
                'erosão': 'Implementar terraceamento e plantio direto',
                'pragas': 'Adotar controle biológico com insetos benéficos',
                'solo pobre': 'Iniciar processo de compostagem e adubação verde',
                'custo': 'Considerar energia solar para reduzir despesas',
                'gado': 'Implementar ILPF (Integração Lavoura-Pecuária-Floresta)',
                'orgânico': 'Buscar certificação orgânica para agregar valor',
                'agroflorest': 'Expandir áreas de agrofloresta para diversificação'
            };
            
            let recommendations = [];
            
            for (const [keyword, recommendation] of Object.entries(keywords)) {
                if (description.toLowerCase().includes(keyword)) {
                    recommendations.push(recommendation);
                }
            }
            
            // Recomendações padrão se nenhuma palavra-chave for encontrada
            if (recommendations.length === 0) {
                recommendations = [
                    'Implementar rotação de culturas para melhorar o solo',
                    'Considerar a instalação de um sistema de compostagem',
                    'Preservar áreas de vegetação nativa para biodiversidade',
                    'Avaliar a possibilidade de energia renovável na propriedade'
                ];
            }
            
            // Adiciona recomendações específicas baseadas em dados públicos (simulado)
            const randomBonusRecommendation = [
                'Sua região tem alto potencial para cultivo de árvores nativas frutíferas',
                'O clima local é favorável para sistemas agroflorestais diversificados',
                'Programas governamentais estão disponíveis para financiamento de práticas sustentáveis na sua área'
            ][Math.floor(Math.random() * 3)];
            
            recommendations.push(randomBonusRecommendation);
            
            // Exibe as recomendações
            recommendationsResult.innerHTML = `
                <h4>Recomendações para sua propriedade:</h4>
                <ul>
                    ${recommendations.map(rec => `<li>${rec}</li>`).join('')}
                </ul>
                <div class="ai-tip">
                    <i class="fas fa-lightbulb"></i> Estas recomendações são geradas por inteligência artificial 
                    e devem ser validadas por um técnico agrícola.
                </div>
            `;
        }, 1500);
    });
});