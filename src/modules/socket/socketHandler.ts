import { Server } from 'socket.io';
import WhatsAppBot from '../whatsapp/OpenWA';

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

            socket.on('sendMessage', async ({ to, message }) => {
                await this.bot.sendMessage(to, message);
            });

            socket.on('disconnect', () => {
                console.log('Usuário desconectado');
            });
        });
    }

    emitQRCode(qr: string) {
        this.io.emit('qrCode', qr);
        console.log('QR Code enviado para o cliente');
    }

    emitNewMessage(message: any) {
        this.io.emit('newMessage', message);
    }
}

export default SocketHandler;