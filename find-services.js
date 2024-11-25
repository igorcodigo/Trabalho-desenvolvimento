document.addEventListener('DOMContentLoaded', loadServices);

function loadServices() {
    const baseURL = 'https://n70231backend-ivrcwps1.b4a.run'; // Substitua pelo seu baseURL
    const authToken = localStorage.getItem('authToken');

    fetch(`${baseURL}/v1/services`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Dados recebidos:', data);
        if (data.success) {
            displayServices(data.items);
        } else {
            alert('Erro ao carregar os serviços.');
        }
    })
    .catch(error => console.error('Erro:', error));
}

function displayServices(services, userId) { // Recebe o userId como parâmetro
    const servicesList = document.getElementById('servicesList');
    servicesList.innerHTML = '';

    services.forEach(service => {
        const serviceItem = document.createElement('div');
        serviceItem.classList.add('service-card');
        serviceItem.style.cursor = 'pointer';
        
        const title = service.title || 'Título não disponível';
        const description = service.description || 'Descrição não disponível';
        const imageUrl = service.image || '';

        serviceItem.innerHTML = `
            <h3 class="service-title">${title}</h3>
            <p class="service-description">${description}</p>
            ${imageUrl ? `<img src="${imageUrl}" alt="${title}" class="service-image">` : ''}
        `;

        // Adiciona o evento de clique para navegar para a página de detalhes
        serviceItem.addEventListener('click', () => {
            // Inclui o userId no URL
            window.location.href = `service-details.html?id=${service._id}&userId=${service.userId}`;
        });

        servicesList.appendChild(serviceItem);
    });
}

function searchServices() {
    const searchTerm = document.getElementById('searchBar').value.toLowerCase();
    const baseURL = 'https://n70231backend-ivrcwps1.b4a.run';
    const authToken = localStorage.getItem('authToken');

    fetch(`${baseURL}/v1/services`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            const filteredServices = data.items.filter(service =>
                (service.title || '').toLowerCase().includes(searchTerm)
            );
            displayServices(filteredServices);
        } else {
            alert('Erro ao pesquisar os serviços.');
        }
    })
    .catch(error => console.error('Erro:', error));
}

function goBack() {
    window.location.href = 'profile.html';
}
