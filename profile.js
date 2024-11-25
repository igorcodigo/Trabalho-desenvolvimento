function loadUserProfile() {
    const userId = localStorage.getItem('userId');
    const authToken = localStorage.getItem('authToken');

    if (!userId || !authToken) {
        alert('Você precisa estar logado para acessar esta página.');
        window.location.href = 'index.html';
        return;
    }

    // Exibe mensagens iniciais enquanto os dados são carregados
    document.getElementById('userName').textContent = 'Carregando...';
    document.getElementById('userEmail').textContent = 'Carregando...';
    document.getElementById('userphoneNumber').textContent = 'Carregando...';

    // Buscar informações adicionais do usuário pela API
    const baseURL = 'https://n70231backend-ivrcwps1.b4a.run'; // Substitua pelo seu baseURL

    fetch(`${baseURL}/v1/users/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        }
    })
    .then(response => {
        if (!response.ok) throw new Error('Erro ao obter dados da API');
        return response.json();
    })
    .then(data => {
        console.log('Dados recebidos:', data);

        // Verifica se os dados recebidos têm os campos esperados
        if (data._id) { 
            const userName = data.name || 'Nome não disponível';
            const userEmail = data.email || 'Email não disponível';
            const phoneNumber = data.phoneNumber || 'Não cadastrado';

            // Atualiza os elementos da página
            document.getElementById('userName').textContent = userName;
            document.getElementById('userEmail').textContent = userEmail;
            document.getElementById('userphoneNumber').textContent = phoneNumber;
        } else {
            alert('Erro ao carregar os dados do usuário.');
            document.getElementById('userName').textContent = 'Erro ao carregar';
            document.getElementById('userEmail').textContent = 'Erro ao carregar';
            document.getElementById('userphoneNumber').textContent = 'Erro ao carregar';
        }
    })
    .catch(error => {
        console.error('Erro ao carregar perfil:', error);
        document.getElementById('userName').textContent = 'Erro ao carregar';
        document.getElementById('userEmail').textContent = 'Erro ao carregar';
        document.getElementById('userphoneNumber').textContent = 'Erro ao carregar';
    });
}

// Funções para navegação
function goToMyServices() {
    window.location.href = 'my-services.html';
}

function findServices() {
    window.location.href = 'find-services.html';
}

function goToCreateService() {
    window.location.href = 'create-service.html';
}

// Carregar o perfil do usuário ao carregar a página
window.onload = loadUserProfile;
