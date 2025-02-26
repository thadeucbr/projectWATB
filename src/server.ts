import "dotenv/config";
import express from 'express';
import socketIO from './modules/socket/socketIO';
import WhatsAppBot from './modules/whatsapp/OpenWA';
import SocketHandler from './modules/socket/socketHandler';
import router from './routes';
import logger from './config/logger';

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

const { server, io } = socketIO(app);

const bot = new WhatsAppBot(null);

const socketHandler = new SocketHandler(io, bot);

bot.socketHandler = socketHandler;

app.use(router);

server.listen(PORT, () => {
    logger.info(`Servidor rodando na porta ${PORT}`);
});

export { bot, io }
