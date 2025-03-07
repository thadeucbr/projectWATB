import { Router } from 'express';
import phonesRouterV1 from './v1/phones.routes';
import aiRouterV1 from './v1/ai.routes';
import whatsappRouterV1 from './v1/whatsapp.routes';

const apiRouter = Router();

apiRouter.use('/api/v1', phonesRouterV1);
apiRouter.use('/api/v1', aiRouterV1);
apiRouter.use('/api/v1', whatsappRouterV1);

export default apiRouter;