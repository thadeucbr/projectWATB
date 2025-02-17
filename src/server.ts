import "dotenv/config";
import express from 'express';
import socketIO from './modules/socket/socketIO';
import WhatsAppBot from './modules/whatsapp/OpenWA';
import SocketHandler from './modules/socket/socketHandler';

const app = express();
const { server, io } = socketIO(app);

const bot = new WhatsAppBot(null);

const socketHandler = new SocketHandler(io, bot);

bot.socketHandler = socketHandler;

app.use('/health', (_req, res) => {
    const healthStatus = bot.checkConnection();
    res.json(healthStatus);
})

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
