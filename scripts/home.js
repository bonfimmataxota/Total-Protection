<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./styles/home.css">
    <title>Total Protection</title>
</head>
<body>
    <header>
        <h1>Total Protection</h1>
    </header>
    
    <section class="button-section">
        <div class="button-group">
            <a href="camera1.html" class="btn camera-btn">Câmera HD</a>
            <a href="camera2.html" class="btn camera-btn">Câmera 4K</a>
            <a href="camera3.html" class="btn camera-btn">Câmera Infra</a>
            <a href="camera4.html" class="btn camera-btn">Câmera WiFi</a>
            <a href="camera5.html" class="btn camera-btn">Câmera 360°</a>
        </div>
    </section>
    
    <script src="./scripts/home.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const loggedUser = localStorage.getItem('loggedUser');
            if (!loggedUser) {
                // Se não houver usuário logado, redireciona para a página de login
                window.location.href = 'login.html';
                return;
            }

            // Aqui você pode continuar implementando as funcionalidades do home
            console.log("Usuário logado:", JSON.parse(loggedUser));
        });
    </script>
</body>
</html>