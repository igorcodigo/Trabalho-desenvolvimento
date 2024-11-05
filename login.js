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
            const user = data.items[0].user;
            const token = data.items[0].token;

            // Armazena o token e as informações do usuário no localStorage
            localStorage.setItem('authToken', token);
            localStorage.setItem('userId', user._id);
            localStorage.setItem('userName', user.name);
            localStorage.setItem('userEmail', user.email);

            // Redireciona para a página de perfil
            window.location.href = 'profile.html';
        } else {
            alert('Erro no login. Verifique suas credenciais.');
        }
    })
    .catch(error => console.error('Erro:', error));
}
