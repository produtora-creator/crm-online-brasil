// src/app.js
const express = require('express');
require('dotenv').config();

// IMPORTAR A NOVA ROTA
const conversationRoutes = require('./routes/conversationRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

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