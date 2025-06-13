// Lógica de login
document.addEventListener('DOMContentLoaded', function() {
    console.log('Login page loaded');
    
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
        console.log('Login form event listener added');
    }
});

function handleLogin(e) {
    e.preventDefault();
    console.log('Login form submitted');
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('login-error');
    
    console.log('Attempting login with:', username, password);
    
    // Simular chamada ao backend
    setTimeout(() => {
        if (username === mockData.user.username && password === mockData.user.password) {
            console.log('Login successful, redirecting to dashboard');
            
            // Salvar dados do usuário no localStorage
            localStorage.setItem('currentUser', JSON.stringify(mockData.user));
            
            // Redirecionar para o dashboard
            window.location.href = 'dashboard.html';
        } else {
            console.log('Login failed');
            if (errorDiv) {
                errorDiv.style.display = 'block';
            }
        }
    }, 500);
}

