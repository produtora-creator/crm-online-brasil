const express = require('express');
const cors = require('cors'); // A declaração deve aparecer apenas UMA VEZ, aqui no topo.
require('dotenv').config();

const conversationRoutes = require('./routes/conversationRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

// MIDDLEWARE
// Configuração de CORS mais explícita para permitir a comunicação.
app.use(cors({
  origin: '*', // Permite acesso de QUALQUER origem
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}));
app.use(express.json());


// ROTAS
app.get('/', (req, res) => {
  res.status(200).json({ message: 'API do WhatsApp CRM está no ar!' });
});

app.use('/api/conversations', conversationRoutes);


// INICIAR SERVIDOR
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});