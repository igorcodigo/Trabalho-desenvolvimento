// profile.js

function loadUserProfile() {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Você precisa estar logado para acessar esta página.');
        window.location.href = 'index.html';
        return;
    }

    fetch('/api/user-profile', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.name && data.email) {
            document.getElementById('userName').textContent = data.name;
            document.getElementById('userEmail').textContent = data.email;
        } else {
            alert('Erro ao carregar perfil. Faça login novamente.');
            localStorage.removeItem('token');
            window.location.href = 'index.html';
        }
    })
    .catch(error => console.error('Erro:', error));
}

// Funções para navegação
function goToMyServices() {
    window.location.href = 'my-services.html';
}

function findServices() {
    window.location.href = 'find-services.html';
}

// Carregar o perfil do usuário ao carregar a página
window.onload = loadUserProfile;
