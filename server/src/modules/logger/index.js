import winston from 'winston';

const log = winston.createLogger({
  level: 'info', // Set the log level to 'error' or another appropriate level
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple()
  ),
  transports: [
    new winston.transports.Console(),
    // Add additional transports as needed (file, database, etc.)
  ],
});

export default log;
