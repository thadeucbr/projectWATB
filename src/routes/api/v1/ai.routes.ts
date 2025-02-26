import { Router } from 'express';
import AiController from '../../../controller/ai/Ai.controller';

const aiRouterV1 = Router();

aiRouterV1.post('/ai', (req, res) => {
  const controller = new AiController(req, res);
  controller.execute();
})


export default aiRouterV1;