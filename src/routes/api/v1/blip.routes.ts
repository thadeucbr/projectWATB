import { Router } from 'express';
import BlipController from '../../../controller/blip/Blip.controller';

const blipRouterV1 = Router();

blipRouterV1.delete('/blip/context', async (req, res) => {
  const controller = new BlipController(req, res);
  await controller.deleteContext();
});

blipRouterV1.get('/blip/context', async (req, res) => {
  const controller = new BlipController(req, res);
  await controller.getContext();
});

blipRouterV1.put('/blip/context/reset', async (req, res) => {
  const controller = new BlipController(req, res);
  await controller.resetContext();
});

export default blipRouterV1;