import { Router } from 'express';
import BlipController from '../../../controller/blip/Blip.controller';

const blipRouterV1 = Router();

blipRouterV1.post('/blip/delete-context', async (req, res) => {
  const controller = new BlipController(req, res);
  await controller.deleteContext();
});

blipRouterV1.post('/blip/get-context', async (req, res) => {
  const controller = new BlipController(req, res);
  await controller.getContext();
});

blipRouterV1.post('/blip/reset-context', async (req, res) => {
  const controller = new BlipController(req, res);
  await controller.resetContext();
});

export default blipRouterV1;