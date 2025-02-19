import { Router } from 'express';
import { bot, io } from '../server';
import apiRouter from './api';
import requestLogger from '../middleware/requestLogger';
import errorHandler from '../middleware/errorHandler';

const router = Router();

router.use(requestLogger)
router.get('/health', (_req, res) => {
    const whatsappConnection = bot.checkConnection();
    const socket = io.of('/');
    let socketConnection = ''
    socket.emit('ping', {}, (response: string) => {
        if (response === 'pong') {
            socketConnection = 'OK'
        } else {
            socketConnection = 'Socket.IO connection error'
        }
    })
    if (whatsappConnection.error) {
        res.status(500).json({ error: whatsappConnection.error});
    }
    res.json({
      whatsappConnection: 'OK',
      socketConnection
    })
});

router.use(apiRouter);

router.use(errorHandler)
export default router;