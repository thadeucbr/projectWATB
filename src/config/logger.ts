import { createLogger, format, transports } from 'winston';
import path from 'path';

const { combine, timestamp, printf, errors, colorize, splat } = format;

// Formato personalizado para os logs
const logFormat = printf(({ level, message, timestamp, stack, ...metadata }) => {
  let logMessage = `${timestamp} [${level}]: ${stack || message}`;
  if (Object.keys(metadata).length) {
    logMessage += ` ${JSON.stringify(metadata)}`;
  }
  return logMessage;
});

// Filtro para capturar apenas logs de requisição
const requestFilter = format((info) => {
  return info.logType === 'request' ? info : false;
});

// Criação da instância do logger
const logger = createLogger({
  level: 'info', // Define o nível mínimo de log
  format: combine(
    errors({ stack: true }), // Captura o stack trace para objetos Error
    splat(), // Permite interpolação de strings
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    logFormat
  ),
  transports: [
    // Transporte para logs de erro
    new transports.File({
      filename: path.resolve(__dirname, '../../logs/error.log'),
      level: 'error',
      handleExceptions: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
    // Transporte para logs combinados (todos os níveis)
    new transports.File({
      filename: path.resolve(__dirname, '../../logs/combined.log'),
      handleExceptions: true,
      maxsize: 5242880,
      maxFiles: 5,
    }),
    // Transporte específico para logs de requisição
    new transports.File({
      filename: path.resolve(__dirname, '../../logs/requests.log'),
      level: 'info',
      handleExceptions: true,
      maxsize: 5242880,
      maxFiles: 5,
      format: combine(
        requestFilter(),
        logFormat
      )
    }),
  ],
  exitOnError: false,
});

// Transporte para o console em desenvolvimento
logger.add(
  new transports.Console({
    level: process.env.NODE_ENV === 'production' ? 'error' : 'info',
    format: combine(
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      errors({ stack: true }),
      splat(),
      colorize({ level: true }),
      logFormat
    ),
  })
);

export default logger;
