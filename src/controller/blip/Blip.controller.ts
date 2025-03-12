import { Request, Response } from 'express';
import BlipService from './Blip.service';
import logger from '../../config/logger';
import { DeleteContextDTO, GetContextDTO, ResetContextDTO } from './Blip.dto';

export default class BlipController {
  private req: Request;
  private res: Response;
  private service: BlipService;

  constructor(req: Request, res: Response) {
    this.req = req;
    this.res = res;
    this.service = new BlipService();
  }

  private authorize(router: string): string {
    const routerKeys = JSON.parse(process.env.ROUTER_KEYS || '[]') as {
      router: string;
      key: string;
    }[];
    const key = routerKeys.find((item) => item.router === router);
    return key ? key.key : '';
  }

  async deleteContext(): Promise<void> {
    try {
      const { userId, varName, router } = this.req.query as unknown as DeleteContextDTO;
      if (!userId || !varName || !router) {
        this.res.status(400).json({ success: false, message: 'userId, varName and router required' });
        return;
      }
      const authorize = this.authorize(router);
      if (!authorize) {
        this.res.status(400).json({ success: false, message: 'Invalid router' });
        return;
      }
      const result = await this.service.deleteContext({ userId, varName, authorize });
      this.res.json(result);
    } catch (error: any) {
      logger.error(error.message);
      this.res.status(500).json({ success: false, message: error.message });
    }
  }

  async getContext(): Promise<void> {
    try {
      const { userId, router } = this.req.query as unknown as GetContextDTO;
      if (!userId || !router) {
        this.res.status(400).json({ success: false, message: 'userId and router required' });
        return;
      }
      const authorize = this.authorize(router);
      if (!authorize) {
        this.res.status(400).json({ success: false, message: 'Invalid router' });
        return;
      }
      const result = await this.service.getContext({ userId, authorize });
      this.res.json(result);
    } catch (error: any) {
      logger.error(error.message);
      this.res.status(500).json({ success: false, message: error.message });
    }
  }

  async resetContext(): Promise<void> {
    try {
      const { phone, router } = this.req.body as ResetContextDTO;
      if (!phone || !router) {
        this.res.status(400).json({ success: false, message: 'phone and router required' });
        return;
      }
      const authorize = this.authorize(router);
      if (!authorize) {
        this.res.status(400).json({ success: false, message: 'Invalid router' });
        return;
      }
      const result = await this.service.resetContext({ phone, authorize });
      this.res.json(result);
    } catch (error: any) {
      logger.error(error.message);
      this.res.status(500).json({ success: false, message: error.message });
    }
  }
}