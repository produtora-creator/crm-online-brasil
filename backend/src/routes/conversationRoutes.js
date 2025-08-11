// src/routes/conversationRoutes.js
const express = require('express');
const router = express.Router();
const conversationController = require('../controllers/conversationController');

// Quando uma requisição GET chegar em '/', chame a função getAllConversations
router.get('/', conversationController.getAllConversations);

module.exports = router;