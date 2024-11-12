// Função para carregar todos os serviços ao carregar a página
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
        if (data.success) {
            displayServices(data.items);
        } else {
            alert('Erro ao carregar os serviços.');
        }
    })
    .catch(error => console.error('Erro:', error));
}

// Função para exibir os serviços na página
function displayServices(services) {
    const servicesList = document.getElementById('servicesList');
    servicesList.innerHTML = ''; // Limpa a lista antes de exibir

    services.forEach(service => {
        const serviceItem = document.createElement('div');
        serviceItem.classList.add('service-item');

        serviceItem.innerHTML = `
            <h3>${service.title}</h3>
            <p>${service.description}</p>
            ${service.image ? `<img src="${service.image}" alt="${service.title}">` : ''}
        `;

        servicesList.appendChild(serviceItem);
    });
}

// Função para pesquisar serviços pelo título
function searchServices() {
    const searchTerm = document.getElementById('searchBar').value.toLowerCase();
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
        if (data.success) {
            // Filtra os serviços com base no termo de pesquisa
            const filteredServices = data.items.filter(service => 
                service.title.toLowerCase().includes(searchTerm)
            );
            displayServices(filteredServices);
        } else {
            alert('Erro ao pesquisar os serviços.');
        }
    })
    .catch(error => console.error('Erro:', error));
}

// Função para voltar ao perfil
function goBack() {
    window.location.href = 'profile.html';
}

// Carrega todos os serviços ao carregar a página
window.onload = loadServices;
