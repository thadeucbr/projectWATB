import { Request, Response, NextFunction } from 'express';
import logger from '../config/logger';

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const startTime = process.hrtime();

  // Extrai informações relevantes
  const { method, url, headers, query, body } = req;
  const userAgent = headers['user-agent'] || 'Unknown';
  const clientIp = headers['x-forwarded-for'] || req.socket.remoteAddress || 'Unknown IP';
  const referer = headers['referer'] || null;
  const origin = headers['origin'] || null;

  res.on('finish', () => {
    const [seconds, nanoseconds] = process.hrtime(startTime);
    const durationMs = (seconds * 1e9 + nanoseconds) / 1e6; // converte para ms
    const { statusCode } = res;

    // Agora passamos uma mensagem string e os metadados separadamente
    logger.info('Incoming Request', {
      logType: 'request',
      method,
      url,
      statusCode,
      durationMs,
      clientIp,
      userAgent,
      referer,
      origin,
      query,
      body,
      headers: { ...headers }
    });
  });

  next();
};

export default requestLogger;
