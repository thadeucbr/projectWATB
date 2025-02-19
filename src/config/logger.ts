import { createLogger, format, transports } from 'winston';
import path from 'path';

const { combine, timestamp, printf, errors } = format;

const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${stack || message}`;
});

const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    errors({ stack: true }),
    logFormat
  ),
  transports: [
    new transports.File({
      filename: path.resolve(__dirname, '../../logs/error.log'),
      level: 'error',
      handleExceptions: true,
      maxsize: 52428800,
      maxFiles: 5,
    }),
    new transports.File({
      filename: path.resolve(__dirname, '../../logs/warning.log'),
      level: 'warning',
      handleExceptions: true,
      maxsize: 52428800,
      maxFiles: 5,
    }),

    new transports.File({
      filename: path.resolve(__dirname, '../../logs/combined.log'),
      handleExceptions: true,
      maxsize: 52428800,
      maxFiles: 5,
    }),
  ],
  exitOnError: false,
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: combine(format.colorize(), logFormat),
    })
  );
}

export default logger;
