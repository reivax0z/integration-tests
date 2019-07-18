import { transports } from 'winston';
const winston = require('winston');

const logFormat = winston.format.printf((info) => {
  return `${info.timestamp} [${info.label || 'server'}] ${info.level}: ${info.correlationId} - ${info.message}`;
});

const logger = winston.createLogger({
  level: process.env.LOGGER_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    logFormat,
  ),
  transports: [new transports.Console()],
});

export { logger };
