// service-details.js

document.addEventListener('DOMContentLoaded', loadServiceDetails);

function loadServiceDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const serviceId = urlParams.get('id');
    const baseURL = 'https://n70231backend-ivrcwps1.b4a.run';
    const authToken = localStorage.getItem('authToken');

    if (!serviceId) {
        alert('Serviço não encontrado');
        window.location.href = 'find-services.html';
        return;
    }

    // Modificado para usar a rota de serviço por ID
    fetch(`${baseURL}/v1/services/${serviceId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        }
    })
    .then(response => {
        console.log('Status da resposta:', response.status);
        return response.json();
    })
    .then(data => {
        console.log('Dados recebidos:', data);
        
        if (data) {
            displayServiceDetails(data);
        } else {
            console.error('Serviço não encontrado:', data);
            alert('Serviço não encontrado.');
            window.location.href = 'find-services.html';
        }
    })
    .catch(error => {
        console.error('Erro na requisição:', error);
        alert('Erro ao carregar os detalhes do serviço.');
        window.location.href = 'find-services.html';
    });
}

// Resto do código permanece o mesmo

function displayServiceDetails(service) {
    const detailsContainer = document.getElementById('serviceDetails');
    
    console.log('Exibindo detalhes do serviço:', service);

    const title = service.title || 'Título não disponível';
    const description = service.description || 'Descrição não disponível';
    const imageUrl = service.image || '';
    const price = service.price || 'Preço não disponível';
    const duration = service.duration || 'Duração não disponível';
    const category = service.category || 'Categoria não disponível';

    detailsContainer.innerHTML = `
        <h2 class="service-title">${title}</h2>
        ${imageUrl ? `<img src="${imageUrl}" alt="${title}" class="service-image">` : ''}
        <div class="service-info">
            <p class="service-description">${description}</p>
            <div class="service-metadata">
                <p><strong>Categoria:</strong> ${category}</p>
                <p><strong>Preço:</strong> R$ ${price}</p>
                <p><strong>Duração:</strong> ${duration}</p>
            </div>
        </div>
    `;
}

function goBack() {
    window.location.href = 'find-services.html';
}