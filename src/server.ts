import "dotenv/config";
import express from 'express';
import socketIO from './modules/socket/socketIO';
import WhatsAppBot from './modules/whatsapp/OpenWA';
import SocketHandler from './modules/socket/socketHandler';

const app = express();
const { server, io } = socketIO(app);

// Inicialize o WhatsAppBot primeiro
const bot = new WhatsAppBot(null); // Inicialize o bot com um valor temporário

// Inicialize o SocketHandler
const socketHandler = new SocketHandler(io, bot); // Passar a instância do SocketHandler ao bot

// Agora atribua o socketHandler ao bot
bot.socketHandler = socketHandler; // Atualiza a instância do bot para incluir o SocketHandler

// No WhatsAppBot, remova a inicialização de socketHandler do construtor
// e mova a lógica de inicialização do cliente para um método separado

// Inicie o servidor
app.use('/health', (_req, res) => {
    const healthStatus = bot.checkConnection();
    res.json(healthStatus);
})

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
