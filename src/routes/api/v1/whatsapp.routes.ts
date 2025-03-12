import { Router } from 'express';
import WhatsAppController from '../../../controller/whatsapp/WhatsApp.controller';

const whatsappRouterV1 = Router();

whatsappRouterV1.post('/whatsapp/webhook', (req, res) => {
  const controller = new WhatsAppController(req, res);
  controller.handleWebhook();
});

export default whatsappRouterV1;