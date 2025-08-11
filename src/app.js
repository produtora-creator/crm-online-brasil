// Importa as bibliotecas
const express = require('express');
require('dotenv').config(); // Carrega as variáveis do arquivo .env

// Inicializa o express
const app = express();

// Define a porta a partir do .env, com um padrão de 3000
const PORT = process.env.PORT || 3000;

// Middleware para o express entender JSON
app.use(express.json());

// Rota de teste principal
app.get('/', (req, res) => {
  res.status(200).json({ message: 'API do WhatsApp CRM está no ar!' });
});

// Inicia o servidor para ouvir na porta definida
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});