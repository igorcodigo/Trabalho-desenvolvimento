function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const baseURL = 'https://n70231backend-ivrcwps1.b4a.run';

    fetch(`${baseURL}/v1/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert(data.message);
            const token = data.items[0].token;
            // Armazene o token no localStorage
            localStorage.setItem('authToken', token);
            // Redirecione para a página principal ou home após o login
            window.location.href = 'home.html';
        } else {
            alert('Erro no login. Verifique suas credenciais.');
        }
    })
    .catch(error => console.error('Erro:', error));
}
