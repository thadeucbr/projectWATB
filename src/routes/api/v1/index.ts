import { Router } from 'express';
import phonesRouterV1 from './phones.routes';
import aiRouterV1 from './ai.routes';
import whatsappRouterV1 from './whatsapp.routes';
import blipRouterV1 from './blip.routes';
import testFileRouter from './testfile.routes';

const apiRouterV1 = Router();

apiRouterV1.use('/v1', phonesRouterV1);
apiRouterV1.use('/v1', aiRouterV1);
apiRouterV1.use('/v1', whatsappRouterV1);
apiRouterV1.use('/v1', blipRouterV1);
apiRouterV1.use('/v1', testFileRouter);

export default apiRouterV1;