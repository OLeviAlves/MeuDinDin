// script.js

// Função para carregar as informações do usuário
function carregarUsuario() {
    const usuarioCorrenteJSON = sessionStorage.getItem("usuarioCorrente");
    if (usuarioCorrenteJSON) {
        const usuario = JSON.parse(usuarioCorrenteJSON);

        // Preenchendo os campos com as informações do usuário
        document.getElementById("user-name").textContent = usuario.nome || "Usuário";
        document.getElementById("user-email").textContent = usuario.email || "Email não encontrado";
    } else {
        alert("Usuário não está logado!");
        window.location.href = "login.html";
    }
}

// Função para salvar a foto de perfil
document.getElementById("upload-pic").addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const img = document.getElementById("profile-pic");
            img.src = e.target.result;

            // Opcional: salvar no localStorage
            localStorage.setItem("fotoPerfil", e.target.result);

            // Alterar o botão de upload para "Editar"
            const label = document.querySelector("label[for='upload-pic']");
            label.textContent = "Editar";
        };

        reader.readAsDataURL(file);
    }
});

// Função para carregar a foto do perfil salva
function carregarFotoPerfil() {
    const fotoPerfil = localStorage.getItem("fotoPerfil");
    if (fotoPerfil) {
        document.getElementById("profile-pic").src = fotoPerfil;

        // Alterar o botão de upload para "Editar" se houver uma foto salva
        const label = document.querySelector("label[for='upload-pic']");
        label.textContent = "Editar";
    }
}

// Logout
document.getElementById("logout-btn").addEventListener("click", function () {
    sessionStorage.removeItem("usuarioCorrente");
    alert("Você foi desconectado!");
    window.location.href = "login.html";
});

// Inicialização
document.addEventListener("DOMContentLoaded", function () {
    carregarUsuario();
    carregarFotoPerfil();
});
