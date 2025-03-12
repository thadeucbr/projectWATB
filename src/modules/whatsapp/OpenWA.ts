import { create, Client, ChatId } from '@open-wa/wa-automate';
import {
  CustomMessageDTO,
  ConnectionStatus,
  WhatsAppBotConfig,
} from './dto/WhatsAppBotDTO';
import SocketHandler from '../socket/socketHandler';
import logger from '../../config/logger';
import axios from 'axios';

class WhatsAppBot {
  client: Client | null = null;
  authenticated = false;
  initialized = false;
  error: string | null = null;
  socketHandler: SocketHandler | null = null;
  phoneList = JSON.parse(process.env.PHONE_LIST || '[]');

  constructor(socketHandler: SocketHandler | null) {
    this.socketHandler = socketHandler;
    // Caso seja necessário inicializar automaticamente,
    // descomente a linha abaixo.
    // this.init();
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
      // Se estiver isolando o open-wa em um container apartado,
      // inicialize o client apenas para casos excepcionais ou ignore.
      this.client = await create(config);

      // Removemos a escuta de onMessage, pois as mensagens serão recebidas via webhook.
      // this.client.onMessage((message) => {
      //   const customMessage = message as unknown as CustomMessageDTO;
      //   logger.info('Mensagem recebida:', { customMessage });
      //   this.handleIncomingMessage(customMessage);
      // });

      logger.info('WhatsApp Client iniciado');
      this.initialized = true;
      this.authenticated = true;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      logger.error(`Erro ao iniciar o cliente: ${errorMsg}`);
      this.error = errorMsg;
    }
  }

  // Novo método para tratar mensagens recebidas via webhook
  handleIncomingWebhook(message: CustomMessageDTO) {
    if (this.socketHandler) {
      switch (message.type) {
        case 'chat':
          if (message.buttons && message.buttons.length > 0) {
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
          } else if (message.body) {
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
          }
          break;

        case 'list':
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

        case 'interactive':
          if (message.interactivePayload) {
            const buttons = message.interactivePayload.buttons.map((button) => {
              const params = JSON.parse(button.buttonParamsJson);
              return {
                name: button.name,
                displayText: params.display_text,
                url: params.url,
              };
            });
            this.socketHandler.emitNewMessage({
              from: message.from,
              body: {
                text: message.text || message.caption,
                buttonText: null,
                options: buttons,
              },
              timestamp: message.timestamp,
              type: 'interactive',
            });
            logger.info('Mensagem interativa enviada', {
              data: {
                from: message.from,
                body: {
                  text: message.text || message.caption,
                  buttonText: null,
                  options: buttons,
                },
                timestamp: message.timestamp,
                type: 'interactive',
              },
            });
          } else {
            logger.warn('Payload de mensagem interativa ausente:', { data: message });
          }
          break;

        default:
          logger.warn(`Tipo de mensagem desconhecido: ${message.type}`);
          logger.warn('Mensagem:', { data: message });
          break;
      }
    } else {
      logger.error('SocketHandler não está inicializado.');
    }
  }

  async sendMessage(to: ChatId, message: string) {
    if (this.phoneList.some((item: any) => item.number === to)) {
      try {
        const response = await axios.post(
          `${process.env.OPENWA_API_URL}/sendText`,
          { args: { to, content: message } },
          {
            headers: {
              api_key: process.env.OPENWA_API_KEY || "mYs3cur3K3y!",
            },
          }
        );
        logger.info(`Mensagem enviada para ${to} via API: ${message}`);
        return response.data;
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : String(error);
        logger.error(`Erro ao enviar mensagem para ${to} via API: ${errorMsg}`);
      }
    } else {
      logger.warning(`Número ${to} não está na lista de números permitidos.`);
      logger.error("Client não está inicializado.");
    }
  }

  checkConnection(): ConnectionStatus {
    try {
      return {
        authenticated: this.authenticated,
        initialized: this.initialized,
        error: this.error,
      };
    } catch (err: any) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      logger.error('Erro ao verificar a conexão:', errorMsg);
      return {
        authenticated: false,
        initialized: false,
        error: errorMsg,
      };
    }
  }
}

export default WhatsAppBot;