document.getElementById('createServiceForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Previne o comportamento padrão do formulário

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const image = document.getElementById('image').value;

    // Recupera o token de autenticação e o userId do localStorage
    const authToken = localStorage.getItem('authToken');
    const userId = localStorage.getItem('userId');
    const baseURL = 'https://n70231backend-ivrcwps1.b4a.run'; // Usando o mesmo baseURL do login

    // Verifica se o usuário está autenticado
    if (!authToken || !userId) {
        alert('Você precisa estar logado para criar um serviço.');
        window.location.href = 'index.html';
        return;
    }

    // Monta os dados para enviar para a API
    const serviceData = {
        title: title,
        description: description,
        image: image,
        userId: userId
    };

    // Envia a requisição para a API
    fetch(`${baseURL}/v1/services`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(serviceData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Serviço criado com sucesso!');
            window.location.href = 'profile.html';
        } else {
            alert(`Erro: ${data.message || 'Erro ao criar o serviço.'}`);
        }
    })
    .catch(error => {
        alert(`Erro: ${error.message}`);
    });
});

function goBack() {
    window.location.href = 'profile.html';
}
