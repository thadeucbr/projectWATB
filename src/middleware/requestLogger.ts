import { Request, Response, NextFunction } from 'express';
import logger from '../config/logger';

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  logger.info(`HTTP ${req.method} ${req.url}`);
  next();
};

export default requestLogger;