document.addEventListener('DOMContentLoaded', () => {
    loadProfessionalDetails();
});

function loadProfessionalDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const professionalId = urlParams.get('id');
    const baseURL = 'https://n70231backend-ivrcwps1.b4a.run';
    const authToken = localStorage.getItem('authToken');

    if (!professionalId) {
        alert('Profissional não encontrado');
        window.location.href = 'find-services.html';
        return;
    }

    // Fetch professional details
    fetch(`${baseURL}/v1/users/${professionalId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao buscar detalhes do profissional');
        }
        return response.json();
    })
    .then(professional => {
        displayProfessionalDetails(professional);
    })
    .catch(error => {
        console.error('Erro na requisição:', error);
        alert('Erro ao carregar os detalhes do profissional.');
        window.location.href = 'find-services.html';
    });
}

function displayProfessionalDetails(professional) {
    const detailsContainer = document.getElementById('professionalDetails');
    
    const name = professional.name || 'Nome não disponível';
    const email = professional.email || 'E-mail não disponível';
    const phone = professional.phoneNumber || 'Telefone não disponível';
    const imageUrl = professional.profileImage || ''; 

    detailsContainer.innerHTML = `
        ${imageUrl ? `<img src="${imageUrl}" alt="${name}" class="professional-image">` : ''}
        <h2 class="professional-name">${name}</h2>
        <div class="contact-info">
            <h3>Informações de Contato</h3>
            <p><strong>E-mail:</strong> ${email}</p>
            <p><strong>Telefone:</strong> ${phone}</p>
        </div>
    `;
}

function goBack() {
    window.location.href = 'find-services.html';
}