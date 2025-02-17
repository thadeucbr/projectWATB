import { Server } from 'socket.io';
import WhatsAppBot from '../whatsapp/OpenWA';
import { IncomingMessageDTO } from './dto/socketDTO';

class SocketHandler {
    io: Server;
    bot: WhatsAppBot;

    constructor(io: Server, bot: WhatsAppBot) {
        this.io = io;
        this.bot = bot;

        this.setupListeners();
    }

    setupListeners() {
        this.io.on('connection', (socket) => {
            console.log('Um usuário se conectou');

            socket.on('ping', (data, callback) => {
                callback('pong');
            })
            
            socket.on('sendMessage', async ({ to, message }) => {
                await this.bot.sendMessage(to, message);
            });

            socket.on('disconnect', () => {
                console.log('Usuário desconectado');
            });
        });
    }

    emitNewMessage(message: IncomingMessageDTO) {
        this.io.emit('newMessage', message);
    }
}

export default SocketHandler;
