// NOVO CÓDIGO PARA O 'index.js'
client.on('qr', (qr) => {
    console.log('Enviando QR Code para o frontend...');
    // Envia a string do QR Code para o frontend
    io.emit('qr_code', qr);
});