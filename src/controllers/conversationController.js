// src/controllers/conversationController.js
const conversationsData = require('../data.js');

// Função para buscar todas as conversas
const getAllConversations = (req, res) => {
  try {
    // Por enquanto, apenas retornamos todos os dados do nosso arquivo
    res.status(200).json(conversationsData);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar conversas' });
  }
};

module.exports = {
  getAllConversations,
};