import { Router } from 'express';
import phonesRouterV1 from './v1/phones.routes';

const apiRouter = Router();

apiRouter.use('/api/v1', phonesRouterV1);

export default apiRouter;