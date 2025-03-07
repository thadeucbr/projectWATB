import { Request, Response } from 'express';
import logger from '../../config/logger';
// Certifique-se de que sua instância do bot seja importada corretamente.
import { bot } from '../../server';

class WhatsAppController {
  req: Request;
  res: Response;

  constructor(req: Request, res: Response) {
    this.req = req;
    this.res = res;
  }

  // Atualizado: adicionamos logs detalhados e tratamento de erros
  async handleWebhook() {
    try {
      const message = this.req.body;
      logger.info('Webhook recebido:', { message });
      
      // Verifica se a mensagem possui dados válidos
      if (!message || Object.keys(message).length === 0) {
        logger.warn('Webhook recebido sem payload');
        return this.res.status(400).json({ error: 'Payload vazio' });
      }

      // Processa a mensagem via instância global do bot
      bot.handleIncomingWebhook(message.data);
      
      return this.res.status(200).json({ success: true });
    } catch (error: any) {
      logger.error('Erro ao processar webhook:', error);
      return this.res
        .status(500)
        .json({ error: error.message || 'Erro no processamento do webhook' });
    }
  }
}

export default WhatsAppController;