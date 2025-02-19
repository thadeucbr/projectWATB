import { Server } from 'socket.io';
import { createServer } from 'http';
import { Express } from 'express';
import logger from '../../config/logger';
const socketIO = (app: Express) => {
    const server = createServer(app);
    const io = new Server(server, {
        cors: {
            origin: '*',
            methods: ["GET", "POST"],
        },
    });

    io.on('connection', (socket) => {
        logger.info('Um usuário se conectou');

        socket.on('disconnect', () => {
            logger.info('Usuário desconectado');
        });
    });

    return { server, io };
};

export default socketIO;