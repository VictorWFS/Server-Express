//inicializar o express no JS

const express = require('express');
const app = express();

//permissão para ler JSON dentro do body da aplicação
app.use(express.json());

const PORT = 3000;

//simulação de um "banco de dados"

let usuarios = [
    {id: 1, nome: "Victor"},
    {id: 2, nome: "Bianca"}
];

//aqui será criado as rotas do CRUD

// CREATE - criar novo usuário
app.post('/usuarios', (req, res) => {
    const {nome} = req.body;
    const novoUsuario = {
        id: usuarios.length + 1,
        nome
    };
    usuarios.push(novoUsuario);
    res.status(201).json(novoUsuario)
});


//READ - Listar todos os usuários
app.get('/usuarios', (req, res) => {
    res.json(usuarios);
});

//READ - Buscar um usuário pelo ID
app.get('/usuarios/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const usuario = usuarios.find(u => u.id === id);
    if (!usuario) { 
        return res.status(404).json({mensagem: "Usuário não encontrado"})
    }
    res.json(usuario);
})

//UPDATE - Atualizar dados de usuário pelo id
app.put('/usuarios/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const {nome} = req.body;
    const usuario = usuarios.find(u => u.id === id);
    if (!usuario) {
        return res.status(404).json({mensagem: "Usuário não encontrado"});
    }
    usuario.nome = nome;
    res.json(usuario)
})

//DELETE - Remover um usuário
app.delete('/usuarios/:id', (req, res) => {
    const id = parseInt(req.params.id)
    usuarios = usuarios.filter(u => u.id !== id)
    res.json({mensagem: "Usuário removido com sucesso!"});
});

//Buscar - Rota para buscar um usuário pelo nome
app.get('/buscar', (req, res) => {
    const {nome} = req.query;
    const resultado = usuarios.filter(u => u.nome.toLowerCase().includes(nome.toLowerCase()));
    res.json(resultado);
});




app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
})