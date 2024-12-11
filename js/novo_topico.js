const topicosForum = {
    criador: [
        { username: 'Bruno Figueiredo' }
    ],
    topicos: [
        { id: 0, donoTopico: 'Bruno Figueiredo', titulo: 'Tópico teste 1', conteudo: 'conteudo.' },
        { id: 1, donoTopico: 'Bruno Figueiredo', titulo: 'Tópico teste 2', conteudo: 'conteudo.' },
        { id: 2, donoTopico: 'Bruno Figueiredo', titulo: 'Tópico teste 3', conteudo: 'conteudo.' },
        { id: 3, donoTopico: 'Bruno Figueiredo', titulo: 'Tópico teste 4', conteudo: 'conteudo.' },
        { id: 4, donoTopico: 'Bruno Figueiredo', titulo: 'Tópico teste 5', conteudo: 'conteudo.' },        
        { id: 5, donoTopico: 'Bruno Figueiredo', titulo: 'Tópico teste 6', conteudo: 'conteudo.' },
        { id: 6, donoTopico: 'Bruno Figueiredo', titulo: 'Tópico teste 7', conteudo: 'conteudo.' },         
        { id: 7, donoTopico: 'Bruno Figueiredo', titulo: 'Tópico teste 8', conteudo: 'conteudo.' },       
    ],
    noticias: [
        { id: 0, donoNoticia: 'Bruno Figueiredo', titulo: 'Noticia teste 1', conteudo: 'conteudo.' },
        { id: 1, donoNoticia: 'Bruno Figueiredo', titulo: 'Noticia teste 2', conteudo: 'conteudo.' },
        { id: 2, donoNoticia: 'Bruno Figueiredo', titulo: 'Noticia teste 3', conteudo: 'conteudo.' },
        { id: 3, donoNoticia: 'Bruno Figueiredo', titulo: 'Noticia teste 4', conteudo: 'conteudo.' },
        { id: 4, donoNoticia: 'Bruno Figueiredo', titulo: 'Noticia teste 5', conteudo: 'conteudo.' },        
        { id: 5, donoNoticia: 'Bruno Figueiredo', titulo: 'Noticia teste 6', conteudo: 'conteudo.' },
        { id: 6, donoNoticia: 'Bruno Figueiredo', titulo: 'Noticia teste 7', conteudo: 'conteudo.' },
        { id: 7, donoNoticia: 'Bruno Figueiredo', titulo: 'Noticia teste 8', conteudo: 'conteudo.' },        
    ]
};

function exibeTopicosRecentes() {
    const container = document.getElementById('postagens_recentes');
   
    container.innerHTML = '<h2>Tópicos Recentes</h2>';
   
    topicosForum.topicos.slice(-5).reverse().forEach((topico, index) => {
        const conteudoEscapado = topico.conteudo.replace(/'/g, "\\'");
        const tituloEscapado = topico.titulo.replace(/'/g, "\\'");
        const card = document.createElement('div');
        card.classList.add('card');
 
        card.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${topico.titulo}</h5>
                <p class="card-text">${topico.conteudo}</p>
                <a href="#" class="btn btn-primary" onClick="abrirPagina('${tituloEscapado}', '${conteudoEscapado}')">Link</a>
            </div>
        `;
        container.appendChild(card);
    });
}


function exibeNoticiasRecentes() {
    const container = document.getElementById('noticias_recentes');
   
    container.innerHTML = '<h2>Noticias Recentes</h2>';
   
    topicosForum.noticias.slice(-5).reverse().forEach((noticia, index) => {
        const conteudoEscapado = noticia.conteudo.replace(/'/g, "\\'");
        const tituloEscapado = noticia.titulo.replace(/'/g, "\\'");
        const card = document.createElement('div');
        card.classList.add('card');
 
        card.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${noticia.titulo}</h5>
                <p class="card-text">${noticia.conteudo}</p>
                <a href="#" class="btn btn-primary" onClick="abrirPagina('${tituloEscapado}', '${conteudoEscapado}')">Link</a>
            </div>
        `;
        container.appendChild(card);
    });
}

 
document.addEventListener("DOMContentLoaded", function() {
    exibeNoticiasRecentes();
    exibeTopicosRecentes();
    pegaPosts();
});

//CREATE
function criarPost() {
    const titulo = document.getElementById('nomeTitulo').value.trim();
    const conteudo = document.getElementById('conteudoPostagem').value.trim();

    // Validação
    if (!titulo || !conteudo) {
        alert("Preencha todos os campos antes de criar o tópico.");
        return;
    }

    topicosForum.topicos.push({
        id: topicosForum.topicos.length, // ID baseado no comprimento atual
        donoTopico: 'Bruno Figueiredo',
        titulo,
        conteudo
    });

    alert("Tópico criado com sucesso!");
    exibeTopicosRecentes(); // Atualizar a exibição
}
//READ
function pegaPosts() {
    return topicosForum.topicos;
}
//UPDATE
function atualizaPost(id, novoConteudo) {
    const post = topicosForum.topicos.find(post => post.id === id);

    if (!post) {
        alert("Tópico não encontrado.");
        return;
    }

    post.conteudo = novoConteudo;
    alert("Tópico atualizado com sucesso!");
    exibeTopicosRecentes(); // Atualizar a exibição
}
//DELETE
function apagaPost(id) {
    const atualizadorDePost = pegaPosts().filter((postAtual) => {
        return postAtual.id !== id;
    })
}

function apagaPost(id) {
    const index = topicosForum.topicos.findIndex(post => post.id === id);

    if (index === -1) {
        alert("Tópico não encontrado.");
        return;
    }

    topicosForum.topicos.splice(index, 1); // Remover tópico
    alert("Tópico excluído com sucesso!");
    exibeTopicosRecentes(); // Atualizar a exibição
}

function abrirPagina(titulo, corpo) {
    const template = `
        <!DOCTYPE html>
<html lang="ptBR">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="css/topico.css">
    <meta name="author" content="Bruno Figueiredo"> 
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    <title>${titulo}</title>
</head>
<body>
    <div class="wrapper">
        <header>
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <img class="logo" src="/imgs/MEU-DINDIN-LETTERING-PRETO.png" alt="Logo" height="100px">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="/home.html">Meu DinDin</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="/investimentos.html">Investimentos</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" aria-current="page" href="/simulador.html">Simuladores</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" aria-current="page" href="/forum.html">Fórum</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" aria-current="page" href="#">Notícias</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/login/index.html"><h5>Entrar</h5></a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        </header>
        <div id="conteudo">
            <h1 id="titulo_principal_topico">${titulo}</h1>
            <p id="corpo_topico">${corpo}</p>
        </div>
        <footer class="py-3 m-y4">
            <div class="container position-relative">
                <div class="row justify-content-center">
                    <div class="col-xl-6">
                        <h2 class="mb-4">Conquiste sua liberdade financeira!</h2>
                        <!-- Signup form-->
                        <!-- * * * * * * * * * * * * * * *-->
                        <!-- * * SB Forms Contact Form * *-->
                        <!-- * * * * * * * * * * * * * * *-->
                        <!-- This form is pre-integrated with SB Forms.-->
                        <!-- To make this form functional, sign up at-->
                        <!-- https://startbootstrap.com/solution/contact-forms-->
                        <!-- to get an API token!-->
                        <form class="form-subscribe" id="contactFormFooter" data-sb-form-api-token="API_TOKEN">
                            <!-- Email address input-->
                            <div class="row">
                                <div class="col">
                                    <input class="form-control form-control-lg" id="emailAddressBelow" type="email" placeholder="Email" data-sb-validations="required,email" data-sb-can-submit="no">
                                    <div class="invalid-feedback text-white" data-sb-feedback="emailAddressBelow:required">Cadastro de e-mail necessário.</div>
                                    <div class="invalid-feedback text-white" data-sb-feedback="emailAddressBelow:email">Email inválido.</div>
                                </div>
                                <div class="col-auto"><button class="btn btn-primary btn-lg disabled" id="submitButton" type="submit">Enviar</button></div>
                            </div>
                            <!-- Submit success message-->
                            <!---->
                            <!-- This is what your users will see when the form-->
                            <!-- has successfully submitted-->
                            <div class="d-none" id="submitSuccessMessage">
                                <div class="text-center mb-3">
                                    <div class="fw-bolder">Seu cadastro foi efetivado!</div>
                                    <p>Faça parte da nossa newsletters!</p>
                                    <a class="text-white" href="https://startbootstrap.com/solution/contact-forms">https://startbootstrap.com/solution/contact-forms</a>
                                </div>
                            </div>
                            <!-- Submit error message-->
                            <!---->
                            <!-- This is what your users will see when there is-->
                            <!-- an error submitting the form-->
                            <div class="d-none" id="submitErrorMessage"><div class="text-center text-danger mb-3">Error no envio!</div></div>
                        </form>
                    </div>
                </div>
            </div>
           <p></p>
            <ul class="nav justify-content-center border-bottom pb-3 mb-3">
                <li class="nav-item">
                    <a href="#" class="nav-link px-2 text-body-secondary">Simuladores</a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link px-2 text-body-secondary">Investimentos</a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link px-2 text-body-secondary">Fórum</a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link px-2 text-body-secondary">Meu dindin</a>
                </li>
            </ul>
            <p class="text-center text-body-secondary">Direitos reservados ao Meu Dindin</p>
        </footer>
</body>
    `;

    const novaJanela = window.open();
    novaJanela.document.write(template);
    novaJanela.document.close();
}