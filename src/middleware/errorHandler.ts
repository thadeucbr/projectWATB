import { Request, Response, NextFunction } from 'express';
import logger from '../config/logger';

interface ErrorWithStatus extends Error {
  status?: number;
}

const errorHandler = (
  err: ErrorWithStatus,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.status || 500;

  logger.error(err.message, err);

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Erro Interno do Servidor',
  });
};

export default errorHandler;
