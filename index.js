// ARQUIVO: index.js
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const express = require('express');
const http = require('http');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

const client = new Client({
    authStrategy: new LocalAuth({ dataPath: './session' })
});

client.on('qr', qr => {
    console.log('QR Code Recebido, escaneie com seu celular!');
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Cliente do WhatsApp está pronto e conectado!');
});

client.on('message', message => {
    console.log(`Mensagem recebida de ${message.from}: ${message.body}`);
    io.emit('message', { from: message.from, body: message.body });
});

client.initialize();

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});