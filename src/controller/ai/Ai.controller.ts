import { Request, Response } from 'express';
import AiService from './Ai.service';
import logger from '../../config/logger';

export default class AiController { 
  private req: Request;
  private res: Response;
  private service: AiService;
  
  constructor(req: Request, res: Response) {
    this.req = req;
    this.res = res;
    this.service = new AiService();
  }

  execute() {
    this.service.fetchGtpResponse(this.req.body)
      .then((data) => {
        logger.info('AI response:', data);
        this.res.json(data);
      })
      .catch((err) => {
        logger.error(err);
        this.res.status(500).json({ error: (err as Error).message });
      });
  }
}