let selectedRating = 0;

document.addEventListener('DOMContentLoaded', () => {
    loadServiceDetails();
    setupStarRating();
});

function setupStarRating() {
    const stars = document.querySelectorAll('.star');
    stars.forEach(star => {
        star.addEventListener('click', () => {
            selectedRating = star.getAttribute('data-rating');
            stars.forEach(s => {
                s.classList.toggle('active', parseInt(s.getAttribute('data-rating')) <= selectedRating);
            });
        });
    });
}

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

    // Fetch service details
    fetch(`${baseURL}/v1/services/${serviceId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data) {
            displayServiceDetails(data);
            loadServiceReviews(serviceId);
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

function loadServiceReviews(serviceId) {
    const baseURL = 'https://n70231backend-ivrcwps1.b4a.run';
    const authToken = localStorage.getItem('authToken');

    fetch(`${baseURL}/v1/review?serviceId=${serviceId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao buscar avaliações');
        }
        return response.json();
    })
    .then(data => {
        console.log('Reviews received:', data); // Log completo para debugging

        // Verificar se o campo 'items' existe e contém dados
        const reviews = data.items || [];
        
        // Calcular a nota média
        const averageRating = reviews.length > 0 
            ? (reviews.reduce((sum, review) => sum + parseInt(review.grade), 0) / reviews.length).toFixed(1)
            : '0';

        // Atualizar a lista de avaliações
        const reviewsList = document.getElementById('reviewsList');
        reviewsList.innerHTML = reviews.map(review => `
            <div class="review">
                <div class="review-rating">${'★'.repeat(review.grade)}</div>
                <p>${review.description}</p>
            </div>
        `).join('');

        // Atualizar o resumo das avaliações (opcional)
        const reviewSummary = document.getElementById('reviewSummary');
        if (reviewSummary) {
            reviewSummary.innerHTML = `
                <p>Total de avaliações: ${reviews.length}</p>
                <p>Nota média: ${averageRating}/5</p>
            `;
        }
    })
    .catch(error => {
        console.error('Erro ao carregar avaliações:', error);
        alert('Não foi possível carregar as avaliações');
    });
}



function submitReview() {
    const urlParams = new URLSearchParams(window.location.search);
    const serviceId = urlParams.get('id');
    const baseURL = 'https://n70231backend-ivrcwps1.b4a.run';
    const authToken = localStorage.getItem('authToken');
    const userId = localStorage.getItem('userId');
    const description = document.getElementById('reviewDescription').value;

    if (!selectedRating || !description.trim()) {
        alert('Por favor, selecione uma nota e escreva um comentário');
        return;
    }

    fetch(`${baseURL}/v1/review`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({
            grade: selectedRating,
            description: description,
            serviceId: serviceId,
            userId: userId
        })
    })
    .then(response => {
        if (response.ok) {
            alert('Avaliação enviada com sucesso!');
            document.getElementById('reviewDescription').value = '';
            selectedRating = 0;
            document.querySelectorAll('.star').forEach(s => s.classList.remove('active'));
            loadServiceReviews(serviceId);
        } else {
            throw new Error('Erro ao enviar avaliação');
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao enviar avaliação');
    });
}

function displayServiceDetails(service) {
    const detailsContainer = document.getElementById('serviceDetails');
    
    const title = service.title || 'Título não disponível';
    const description = service.description || 'Descrição não disponível';
    const imageUrl = service.image || ''; 

    detailsContainer.innerHTML = `
        <h2 class="service-title">${title}</h2>
        ${imageUrl ? `<img src="${imageUrl}" alt="${title}" class="service-image">` : ''}
        <div class="service-info">
            <p class="service-description">${description}</p> 
        </div>
    `;
}

function goBack() {
    window.location.href = 'find-services.html';
}