const { create } = require('@open-wa/wa-automate');
import { IncomingMessage, ConnectionStatus, WhatsAppBotConfig } from './dto/WhatsAppBotDTO';
import SocketHandler from '../socket/socketHandler';

class WhatsAppBot {
    client: any;
    authenticated = false;
    initialized = false;
    error: string | null = null;
    socketHandler: SocketHandler;

    constructor(socketHandler: SocketHandler) {
        this.socketHandler = socketHandler;
        this.init();
    }

    async init() {
        const config: WhatsAppBotConfig = {
            session: 'session-name',
            puppeteer: {
                headless: false,
            },
        };

        try {
            this.client = await create(config);

            this.client.onQR((qr: string) => {
                this.socketHandler.emitQRCode(qr); // Emitir QR Code através do SocketHandler
            });

            this.client.onAuthenticated(() => {
                this.authenticated = true;
                console.log('Cliente autenticado');
            });

            this.client.onAuthFail(() => {
                console.log('Falha na autenticação');
            });

            this.client.onMessage((message: IncomingMessage) => {
                console.log('Mensagem recebida:', message.body);
                this.handleIncomingMessage(message);
            });

            console.log('WhatsApp Client iniciado');
            this.initialized = true;
        } catch (err) {
            console.error('Erro ao iniciar o cliente:', err);
            this.error = err instanceof Error ? err.message : String(err);
        }
    }

    handleIncomingMessage(message: IncomingMessage) {
        if (this.client) {
            this.socketHandler.emitNewMessage({
                from: message.from,
                body: message.body,
                timestamp: message.timestamp
            });
        } else {
            console.error('Client não está inicializado.');
        }
    }

    async sendMessage(to: string, message: string) {
        if (this.client) {
            try {
                await this.client.sendText(to, message);
                console.log(`Mensagem enviada para ${to}: ${message}`);
            } catch (error) {
                console.error(`Erro ao enviar mensagem para ${to}:`, error);
            }
        } else {
            console.error('Client não está inicializado.');
        }
    }

    checkConnection(): ConnectionStatus {
        return {
            authenticated: this.authenticated,
            initialized: this.initialized,
            error: this.error
        };
    }
}

export default WhatsAppBot;
