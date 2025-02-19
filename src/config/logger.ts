// src/config/logger.ts

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
logger.add(
  new transports.Console({
    level: process.env.NODE_ENV === 'production' ? 'error' : 'info',
    format: combine(
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Adiciona o timestamp primeiro
      errors({ stack: true }), // Processa os erros
      splat(), // Permite a interpolação de strings
      colorize({ level: true }), // Aplica a colorização após os dados já estarem definidos
      logFormat // Por fim, formata a mensagem final
    ),
  })
);

export default logger;
