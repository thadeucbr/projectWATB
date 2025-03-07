import { Router } from 'express';
import WhatsAppController from '../../../controller/whatsapp/WhatsApp.controller';

const whatsappRouterV1 = Router();

// Atualizado: adicionamos log para confirmar o recebimento do webhook.
whatsappRouterV1.post('/whatsapp/webhook', (req, res) => {
  console.log('Requisição recebida no webhook:', req.body);
  const controller = new WhatsAppController(req, res);
  controller.handleWebhook();
});

export default whatsappRouterV1;