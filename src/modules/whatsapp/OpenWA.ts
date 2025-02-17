import { create } from '@open-wa/wa-automate';
import {
  IncomingMessage,
  ConnectionStatus,
  WhatsAppBotConfig,
} from './dto/WhatsAppBotDTO';
import SocketHandler from '../socket/socketHandler';

class WhatsAppBot {
  client: any;
  authenticated = false;
  initialized = false;
  error: string | null = null;
  socketHandler: SocketHandler | null = null;

  constructor(socketHandler: SocketHandler | null) {
    this.socketHandler = socketHandler;
    this.init();
  }

  async init() {
    const config: WhatsAppBotConfig = {
      session: 'session-name',
      puppeteer: {
        headless: true,
        executablePath: process.env.CHROME_BIN || '/usr/bin/chromium-browser',
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-gpu',
        ],
        useChrome: false,
      },
    };

    try {
      this.client = await create(config);

      this.client.onMessage((message: IncomingMessage) => {
        console.log('Mensagem recebida:', message);
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
    if (this.client && this.socketHandler) {
      switch (message.type) {
        case 'chat':
          // Mensagem de texto normal
          if (message.body) {
            this.socketHandler.emitNewMessage({
              from: message.from,
              body: {
                text: message.text,
                buttonText: null,
                options: null,
              },
              timestamp: message.timestamp,
              type: 'text',
            });
          } else if (message.buttons && message.buttons.length > 0) {
            this.socketHandler.emitNewMessage({
              from: message.from,
              body: {
                text: message.text,
                buttonText: null,
                options: message.buttons,
              },
              timestamp: message.timestamp,
              type: 'button',
            });
          }
          break;

        case 'list':
          // Mensagem de lista
          if (message.list) {
            this.socketHandler.emitNewMessage({
              from: message.from,
              body: {
                text: message.text,
                buttonText: message.list.buttonText,
                options: message.list.sections[0].rows,
              },
              timestamp: message.timestamp,
              type: 'list',
            });
          }
          break;

        default:
          console.warn(`Tipo de mensagem desconhecido: ${message.type}`);
          break;
      }
    } else {
      console.error('Client ou SocketHandler não estão inicializados.');
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
      error: this.error,
    };
  }
}

export default WhatsAppBot;
