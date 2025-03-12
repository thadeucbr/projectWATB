import "dotenv/config";
import express from 'express';
import cors from 'cors';           // <-- Importamos o cors
import socketIO from './modules/socket/socketIO';
import WhatsAppBot from './modules/whatsapp/OpenWA';
import SocketHandler from './modules/socket/socketHandler';
import router from './routes';
import logger from './config/logger';

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());

// Configure o CORS para permitir apenas a origem do front-end
app.use(cors({
  origin: [
    'https://project6.barbudas.com', // produção
    'http://localhost:5173'         // se quiser testar local
  ],
  methods: ['GET','POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // se precisar enviar cookies ou headers autenticados
}));

app.use(express.json());

const { server, io } = socketIO(app);
const bot = new WhatsAppBot(null);
const socketHandler = new SocketHandler(io, bot);

bot.socketHandler = socketHandler;
app.use(router);

server.listen(PORT, () => {
    logger.info(`Servidor rodando na porta ${PORT}`);
});

export { bot, io };
