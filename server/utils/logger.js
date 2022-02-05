import winston from "winston";

class Logger {

  static config() {
    // TODO: load config from file
  }

  static logFormat = winston.format.printf((info) => {
    return `${info.timestamp} ${info.level}: ${info.message}`;
  });

  static requestLogger = (req, res, next) => {
    this.generalLogger.info(`${req.method} ${req.path}`);
    next();
  };

  static errorLogger = (err, req, res, next) => {
    this.generalLogger.error(err);
    next(err);
  };

  static generalLogger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp(),
      this.logFormat
    ),
    transports: [
      new winston.transports.Console()
    ]
  });
}

Logger.config();

export const requestLogger = Logger.requestLogger;
export const errorLogger = Logger.errorLogger;

export default Logger.generalLogger;