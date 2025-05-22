// Dados de exemplo para o ranking
const producers = [
    {
        id: 1,
        name: "Fazenda UFOB",
        location: "Barreiras, BA",
        category: "hortifruti",
        practices: ["agrofloresta", "compostagem", "controle-biologico"],
        rating: 4.8,
        description: "Produção de hortaliças orgânicas em sistema agroflorestal."
    },
    {
        id: 2,
        name: "Sítio do Sol",
        location: "Riachão das Neves, BA",
        category: "cafe",
        practices: ["plantio-direto", "rotacao", "energia-renovavel"],
        rating: 4.5,
        description: "Café especial produzido com energia solar e manejo sustentável."
    },
    {
        id: 3,
        name: "Estância Verde",
        location: "Correntina, BA",
        category: "pecuaria",
        practices: ["manejo-integrado", "conservacao", "compostagem"],
        rating: 4.2,
        description: "Pecuária sustentável com integração lavoura-pecuária-floresta."
    },
    {
        id: 4,
        name: "Chácara das Frutas",
        location: "LEM, BA",
        category: "hortifruti",
        practices: ["rotacao", "controle-biologico"],
        rating: 3.9,
        description: "Fruticultura com manejo integrado de pragas."
    },
    {
        id: 5,
        name: "Fazenda Boa Vista",
        location: "Santa Rita, BA",
        category: "graos",
        practices: ["plantio-direto", "rotacao"],
        rating: 3.7,
        description: "Produção de grãos em sistema de plantio direto."
    },
    {
        id: 6,
        name: "Fazenda Alegria boa",
        location: "Formosa do Rio Preto, BA",
        category: "hortifruti",
        practices: ["agrofloresta", "compostagem", "energia-renovavel"],
        rating: 4.9,
        description: "Agricultura sintrópica com geração de energia renovável."
    }
];

// Renderiza o ranking
function renderRanking(filteredProducers = producers) {
    const rankingList = document.getElementById('ranking-list');
    rankingList.innerHTML = '';
    
    // Ordena por rating
    const sortedProducers = [...filteredProducers].sort((a, b) => b.rating - a.rating);
    
    sortedProducers.forEach(producer => {
        const stars = '★'.repeat(Math.round(producer.rating)) + '☆'.repeat(5 - Math.round(producer.rating));
        
        const card = document.createElement('div');
        card.className = 'producer-card';
        card.innerHTML = `
            <div class="producer-header">
                <div class="producer-name">${producer.name}</div>
                <div class="producer-rating">
                    <span class="stars">${stars}</span>
                    <span class="rating">${producer.rating.toFixed(1)}</span>
                </div>
            </div>
            <div class="producer-body">
                <div class="producer-location">
                    <i class="fas fa-map-marker-alt"></i> ${producer.location}
                </div>
                <span class="producer-category">${getCategoryName(producer.category)}</span>
                <p>${producer.description}</p>
                <div class="producer-practices">
                    ${producer.practices.map(practice => `<span class="practice-tag">${getPracticeName(practice)}</span>`).join('')}
                </div>
            </div>
            <div class="producer-footer">
                <a href="produtor.html?id=${producer.id}" class="btn">Ver detalhes</a>
                <button class="qr-btn" data-id="${producer.id}">Ver QRCode</button>
            </div>
        `;
        
        rankingList.appendChild(card);
    });
    
    // Adiciona eventos aos botões de QRCode
    document.querySelectorAll('.qr-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const producerId = parseInt(this.getAttribute('data-id'));
            showQRCode(producerId);
        });
    });
}

// Filtra o ranking
function setupFilters() {
    const searchInput = document.getElementById('search-producer');
    const regionFilter = document.getElementById('filter-region');
    const categoryFilter = document.getElementById('filter-category');
    
    function applyFilters() {
        const searchTerm = searchInput.value.toLowerCase();
        const region = regionFilter.value;
        const category = categoryFilter.value;
        
        const filtered = producers.filter(producer => {
            const matchesSearch = producer.name.toLowerCase().includes(searchTerm) || 
                                producer.description.toLowerCase().includes(searchTerm);
            const matchesCategory = category === '' || producer.category === category;
            // Nota: A região não está nos dados de exemplo, seria implementada em produção real
            return matchesSearch && matchesCategory;
        });
        
        renderRanking(filtered);
    }
    
    searchInput.addEventListener('input', applyFilters);
    regionFilter.addEventListener('change', applyFilters);
    categoryFilter.addEventListener('change', applyFilters);
}

// Mostra o QRCode em um modal
function showQRCode(producerId) {
    const producer = producers.find(p => p.id === producerId);
    if (!producer) return;
    
    // Cria o modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h3>QRCode para ${producer.name}</h3>
            <div id="qrcode-container"></div>
            <p>Escaneie este código para ver as informações do produtor</p>
            <a href="selo.html?id=${producer.id}" target="_blank" class="btn">Ver página do selo</a>
            <button class="btn download-qr">Download QRCode</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Gera o QRCode
    const qrcode = new QRCode(document.getElementById('qrcode-container'), {
        text: `${window.location.origin}/selo.html?id=${producer.id}`,
        width: 200,
        height: 200,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });
    
    // Fecha o modal
    modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.remove();
    });
    
    // Download do QRCode
    modal.querySelector('.download-qr').addEventListener('click', () => {
        const canvas = document.querySelector('#qrcode-container canvas');
        const link = document.createElement('a');
        link.download = `selo-${producer.name.replace(/\s+/g, '-')}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
    
    // Fecha ao clicar fora
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Formulário de cadastro
function setupRegistrationForm() {
    const form = document.getElementById('producer-form');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const location = document.getElementById('location').value;
        const category = document.getElementById('category').value;
        const description = document.getElementById('description').value;
        
        const practiceCheckboxes = document.querySelectorAll('input[name="practice"]:checked');
        const practices = Array.from(practiceCheckboxes).map(cb => cb.value);
        
        // Simula o processamento do cadastro
        alert(`Cadastro enviado com sucesso!\n\nNome: ${name}\nLocal: ${location}\nCategoria: ${getCategoryName(category)}\nPráticas: ${practices.map(p => getPracticeName(p)).join(', ')}`);
        
        // Limpa o formulário
        form.reset();
    });
}

// Helper functions
function getCategoryName(category) {
    const categories = {
        'hortifruti': 'Hortifrúti',
        'graos': 'Grãos',
        'cafe': 'Café',
        'pecuaria': 'Pecuária',
        'outros': 'Outros'
    };
    return categories[category] || category;
}

function getPracticeName(practice) {
    const practices = {
        'agrofloresta': 'Agrofloresta',
        'plantio-direto': 'Plantio Direto',
        'rotacao': 'Rotação de Culturas',
        'controle-biologico': 'Controle Biológico',
        'compostagem': 'Compostagem',
        'energia-renovavel': 'Energia Renovável',
        'conservacao': 'Conservação de Áreas',
        'manejo-integrado': 'Manejo Integrado'
    };
    return practices[practice] || practice;
}

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    renderRanking();
    setupFilters();
    setupRegistrationForm();
    
    // Adiciona estilo para o modal
    const style = document.createElement('style');
    style.textContent = `
        .modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }
        
        .modal-content {
            background-color: white;
            padding: 30px;
            border-radius: 10px;
            max-width: 500px;
            width: 90%;
            text-align: center;
            position: relative;
        }
        
        .close-modal {
            position: absolute;
            top: 10px;
            right: 15px;
            font-size: 24px;
            cursor: pointer;
            color: var(--text-light);
        }
        
        #qrcode-container {
            margin: 20px auto;
            display: inline-block;
        }
        
        .download-qr {
            margin-top: 15px;
            background-color: var(--primary-color);
        }
    `;
    document.head.appendChild(style);
});