function loadUserProfile() {
    const userName = localStorage.getItem('userName');
    const userEmail = localStorage.getItem('userEmail');

    if (!userName || !userEmail) {
        alert('Você precisa estar logado para acessar esta página.');
        window.location.href = 'index.html';
        return;
    }

    // Exibe as informações do usuário na página
    document.getElementById('userName').textContent = userName;
    document.getElementById('userEmail').textContent = userEmail;
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
