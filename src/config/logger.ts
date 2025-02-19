// src/config/logger.ts

import { createLogger, format, transports } from 'winston';
import path from 'path';

// Desestruturação dos formatos do Winston
const { combine, timestamp, printf, errors } = format;

// Formato personalizado para os logs
const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${stack || message}`;
});

// Criação da instância do logger
const logger = createLogger({
  level: 'info', // Define o nível mínimo de log
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    errors({ stack: true }), // Captura o stack trace para objetos Error
    logFormat
  ),
  transports: [
    // Transporte para logs de erro
    new transports.File({
      filename: path.resolve(__dirname, '../../logs/error.log'),
      level: 'error', // Apenas logs de erro
      handleExceptions: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
    // Transporte para logs combinados (todos os níveis)
    new transports.File({
      filename: path.resolve(__dirname, '../../logs/combined.log'),
      handleExceptions: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
  ],
  exitOnError: false, // Não finalizar o processo em exceções não tratadas
});

// Se estivermos em desenvolvimento, também registrar no console
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: combine(
        format.colorize(),
        logFormat
      ),
    })
  );
}

export default logger;
