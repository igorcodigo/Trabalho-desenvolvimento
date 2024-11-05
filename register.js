function register() {
    const name = document.getElementById('registerName').value; // Novo campo para nome
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    // URL base da API
    const baseURL = 'https://n70231backend-ivrcwps1.b4a.run';

    fetch(`${baseURL}/v1/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password }) // Inclua o campo 'name' no corpo da requisição
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Cadastro realizado com sucesso!');
            window.location.href = 'index.html';
        } else {
            alert('Erro no cadastro. Tente novamente.');
        }
    })
    .catch(error => console.error('Erro:', error));
}