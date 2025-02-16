import { Server } from 'socket.io';
import { createServer } from 'http';

const socketIO = (app: any) => {
    const server = createServer(app);
    const io = new Server(server, {
        cors: {
            origin: '*',
            methods: ["GET", "POST"],
        },
    });

    io.on('connection', (socket) => {
        console.log('Um usuário se conectou');

        socket.on('disconnect', () => {
            console.log('Usuário desconectado');
        });
    });

    return { server, io };
};

export default socketIO;