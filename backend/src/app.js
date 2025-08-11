// src/app.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// IMPORTAR A NOVA ROTA
const conversationRoutes = require('./routes/conversationRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

const cors = require('cors');

app.use(cors({
  origin: '*', // Permite acesso de QUALQUER origem
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Permite todos estes métodos HTTP
}));

app.use(express.json());

// Rota de teste principal
app.get('/', (req, res) => {
  res.status(200).json({ message: 'API do WhatsApp CRM está no ar!' });
});

// USAR AS ROTAS DE CONVERSA COM UM PREFIXO /api
app.use('/api/conversations', conversationRoutes);


app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});