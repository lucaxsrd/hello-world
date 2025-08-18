require('dotenv').config();

const express= require('express');

const app = express();

const User = require('./user');

const port = 3000;

const bcrypt = require('bcryptjs');

require('dotenv').config();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Olá, mundo da API!');
});


app.post('/register', async (req, res) => {
  try {
    const {nome, email, senha} = req.body;
    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(senha, salt);
    const novoUsuario = new User({
      nome,
      email,
      senha: senhaHash
    });
    await novoUsuario.save();
    res.status(201).json({mensagem: 'Usuario registrado com sucesso!'});
  } catch (error) {
    res.status(500).json({mensagem:'Erro ao registrar usuário.', erro: error.message});
  }
});

const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

app.post('/login', async (req, res) => {
  try {
    const { email, senha } = req.body;
    const usuarios = await User.findOne({ email}).select('+senha');
    if (!usuarios){
      return res.status(404).json({ mensagem: 'Credenciais inválidas.'});
    }
    const isMatch = await bcrypt.compare(senha, usuarios.senha);
    if (!isMatch) {
      return res.status(400).json({ mensagem: 'Credenciais inválidas.' });
    }
    const token = jwt.sign({ id: usuarios._id }, JWT_SECRET, {
      expiresIn: '1h'
    });
    res.status(200).json({ token });
} catch (error) {
    res.status(500).json({ mensagem: 'Erro ao fazer login.', erro: error.message });
  }
}); 

app.get('/usuarios', async (req, res) => {
  try {
    const usuarios = await User.find();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).send('Erro ao buscar usuários.');
  }
});

app.post('/usuarios', async (req, res) => {
  try{
   const novoUsuario = new User(req.body); 
   await novoUsuario.save();
   res.status(201).json(novoUsuario);
  } catch (erro){
    console.error(erro);
    res.status(500).send('Erro ao criar usuário.');
  }
});

app.put('/usuarios/:id', async (req, res) => {
  try{
  const userId = req.params.id;
  const novosDados = req.body;
  
  const usuarioAtualizado = await User.findByIdAndUpdate(userId, novosDados, { new: true });

  if (!usuarioAtualizado) {
    return res.status(404).send ('Usuário não encontrado.');
  }
    res.status(200).json(usuarioAtualizado);
  } catch (error) {
    res.status(500).send('Erro ao atualizar usuário');
  }
});

app.delete('/usuarios/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const usuarioDeletado = await User.findByIdAndDelete(userId);
    
    if (!usuarioDeletado) {
      return res.status(404).send('Usuário não encontrado.');
    }

  res.status(200).json(usuarioDeletado);
  } catch (error) {
    res.status(500).send('Erro ao deletar usuário');
  }
});

const { connectDB } = require('./database');

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server rodando em http://localhost:${port}`);
  });
});