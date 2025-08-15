const express= require('express');

const app = express();

const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Olá, mundo da API!');
});

const usuarios = [
  { id: 1, nome: 'Lucas' }
];  

app.get('/usuarios', (req, res) => {
  res.status(200).json(usuarios);
});

app.post('/usuarios', (req, res) => {
  const novoUsuario = req.body;
usuarios.push(novoUsuario);
  res.status(201).json(novoUsuario);
});
app.put('/usuarios/:id', (req, res) => {

  const userId = parseInt(req.params.id);
  const novosDados = req.body;
  const UsuarioEncontrado = usuarios.find(u => u.id === userId);
  if (UsuarioEncontrado) {
    UsuarioEncontrado.nome = novosDados.nome;
    res.status(200).json(UsuarioEncontrado);
  } else {
    res.status(404).json({ mensagem: 'Usuário não encontrado' });
  }
});

app.patch('/usuarios/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const novosDados = req.body;
  const UsuarioEncontrado = usuarios.find(u => u.id === userId);
  if (UsuarioEncontrado) {
    UsuarioEncontrado.nome = novosDados.nome;
    res.status(200).json(UsuarioEncontrado);
  } else {
    res.status(404).json({ mensagem: 'Usuário não encontrado' });
  }
});

app.delete('/usuarios/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const index = usuarios.findIndex(u => u.id === userId);
  if (index !== -1) {
    const UsuarioDeletado = usuarios.splice[index, 1];
    usuarios.splice(index, 1);
    res.status(200).json(UsuarioDeletado);
  } else {
    res.status(404).json({ mensagem: 'Usuário não encontrado' });
  }
});

app.listen(port,() => {
  console.log(`Server rodando em http://localhost:${port}`);
}); 