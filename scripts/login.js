document.addEventListener('DOMContentLoaded', () => {
    // Se já houver um usuário logado, redireciona direto para home.html
    const storedLoggedUser = localStorage.getItem('loggedUser');
    if (storedLoggedUser) {
        window.location.href = 'home.html';
        return;
    }
    
    const loginForm = document.getElementById('login-form');
    if (!loginForm) {
        console.error("Formulário de login não encontrado!");
        return;
    }
    
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nameInput = document.getElementById('login-username');
        const passwordInput = document.getElementById('login-password');
        
        if (!nameInput || !passwordInput) {
            console.error("Campos de nome ou senha não encontrados!");
            alert("Erro no formulário, verifique os campos.");
            return;
        }
        
        const name = nameInput.value.trim();
        const password = passwordInput.value;
        
        console.log("Tentando login com:", name, password);
        
        // Recupera os usuários salvos no localStorage
        const storedUsers = localStorage.getItem('users');
        let users = [];
        if (storedUsers) {
            try {
                users = JSON.parse(storedUsers);
            } catch (error) {
                console.error("Erro ao ler os usuários do localStorage:", error);
            }
        }
        
        // Verifica se existe um usuário com as credenciais informadas
        const loggedUser = users.find(user => 
            user.name === name && user.password === password
        );
        
        if (loggedUser) {
            console.log("Login bem-sucedido:", loggedUser);
            // Salva os dados do usuário logado no localStorage
            localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
            // Redireciona para a página home.html
            window.location.href = 'home.html';
        } else {
            console.log("Credenciais inválidas");
            alert("Nome ou senha incorretos!");
        }
    });
});