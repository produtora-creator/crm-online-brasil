// ARQUIVO: index.js (VERSÃO 2.0 - COM FERRAMENTAS)

const { Client, LocalAuth } = require('whatsapp-web.js');
const express = require('express');
const { Server } = require("socket.io");
const http = require('http');

// Configuração do servidor
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(__dirname)); // Permite servir arquivos como o index.html

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Configuração do Cliente WhatsApp
const client = new Client({
    authStrategy: new LocalAuth({ dataPath: './session' }),
    puppeteer: {
        headless: true,
        args: [
            '--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas', '--no-first-run', '--no-zygote', '--disable-gpu'
        ]
    }
});

client.on('ready', async () => {
    console.log('Cliente pronto! Buscando conversas...');
    // Notifica o frontend que o cliente está pronto
    io.emit('client_ready'); 

    // Busca e envia a lista de conversas iniciais para o frontend
    try {
        const chats = await client.getChats();
        io.emit('initial_chats', chats.map(chat => ({
            id: chat.id._serialized,
            name: chat.name,
            isGroup: chat.isGroup
        })));
        console.log('Lista de conversas enviada para o frontend.');
    } catch (err) {
        console.error('Erro ao buscar conversas:', err);
    }
});

client.on('message', async (message) => {
    console.log(`Mensagem recebida de ${message.from}: ${message.body}`);
    const contact = await message.getContact();
    // Envia a mensagem recebida para o frontend com mais detalhes
    io.emit('new_message', {
        from: message.from,
        to: message.to,
        body: message.body,
        name: contact.pushname || message.from // Nome do contato ou número
    });
});

client.initialize();

// Comunicação com o Frontend via Socket.IO
io.on('connection', (socket) => {
    console.log('Frontend conectado:', socket.id);

    // Recebe o pedido para enviar mensagem
    socket.on('send_message', (data) => {
        const { number, message } = data;
        if (!number || !message) {
            console.log('Pedido para enviar mensagem inválido:', data);
            return;
        }
        console.log(`Enviando mensagem para ${number}: ${message}`);
        client.sendMessage(number, message).catch(err => {
            console.error(`Erro ao enviar mensagem para ${number}:`, err);
        });
    });

    socket.on('disconnect', () => {
        console.log('Frontend desconectado:', socket.id);
    });
});

// Inicia o servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});