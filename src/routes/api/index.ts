import { Router } from 'express';
import apiRouterV1 from './v1';

const apiRouter = Router();

apiRouter.use('/api', apiRouterV1);

export default apiRouter;
