// Página inicial de Login
const LOGIN_URL = "login.html";
const USUARIO_URL = "usuario.html";

// Objeto para o banco de dados de usuários baseado em JSON
let db_usuarios = {};

// Objeto para o usuário corrente
let usuarioCorrente = {};

// Gera códigos randômicos para uso como IDs
function generateUUID() {
    let d = new Date().getTime();
    let d2 = (performance && performance.now && (performance.now() * 1000)) || 0;
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = Math.random() * 16;
        if (d > 0) {
            r = (d + r) % 16 | 0;
            d = Math.floor(d / 16);
        } else {
            r = (d2 + r) % 16 | 0;
            d2 = Math.floor(d2 / 16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

// Dados iniciais de usuários
const dadosIniciais = {
    usuarios: [
        { "id": generateUUID(), "login": "admin", "senha": "123", "nome": "Administrador do Sistema", "email": "admin@abc.com" },
        { "id": generateUUID(), "login": "user", "senha": "123", "nome": "Usuário Comum", "email": "user@abc.com" },
    ]
};

// Inicializa os dados do sistema
function initLoginApp() {
    // Inicializa o usuário corrente a partir do sessionStorage
    let usuarioCorrenteJSON = sessionStorage.getItem('usuarioCorrente');
    if (usuarioCorrenteJSON) {
        usuarioCorrente = JSON.parse(usuarioCorrenteJSON);
    }

    // Carrega o banco de dados de usuários do localStorage
    let usuariosJSON = localStorage.getItem('db_usuarios');
    if (!usuariosJSON) {
        alert('Dados de usuários não encontrados no localStorage. Fazendo carga inicial.');
        db_usuarios = dadosIniciais;
        localStorage.setItem('db_usuarios', JSON.stringify(dadosIniciais));
    } else {
        db_usuarios = JSON.parse(usuariosJSON);
    }
}

// Valida o login do usuário
function loginUser(login, senha) {
    for (let usuario of db_usuarios.usuarios) {
        if (login === usuario.login && senha === usuario.senha) {
            usuarioCorrente = {
                id: usuario.id,
                login: usuario.login,
                nome: usuario.nome,
                email: usuario.email
            };

            sessionStorage.setItem('usuarioCorrente', JSON.stringify(usuarioCorrente));
            window.location = USUARIO_URL; // Redireciona para a página de usuário
            return true;
        }
    }
    return false;
}

// Desloga o usuário
function logoutUser() {
    usuarioCorrente = {};
    sessionStorage.removeItem('usuarioCorrente');
    window.location = LOGIN_URL;
}

// Adiciona novo usuário ao banco de dados
function addUser(nome, login, senha, email) {
    let newId = generateUUID();
    let usuario = { id: newId, login, senha, nome, email };
    db_usuarios.usuarios.push(usuario);
    localStorage.setItem('db_usuarios', JSON.stringify(db_usuarios));
}

// Exibe o nome do usuário logado na página `usuario.html`
function carregarDadosUsuario() {
    let usuarioJSON = sessionStorage.getItem('usuarioCorrente');
    if (usuarioJSON) {
        let usuario = JSON.parse(usuarioJSON);
        document.getElementById('user-name').textContent = usuario.nome || "Usuário";
        document.getElementById('user-email').textContent = usuario.email || "E-mail não informado";
    } else {
        window.location = LOGIN_URL; // Redireciona para login se não houver usuário logado
    }
}

// Inicializa o app
initLoginApp();
