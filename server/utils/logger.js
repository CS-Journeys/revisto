import winston, { loggers } from "winston";
import WinstonCloudwatch from "winston-cloudwatch";
import AWS from "aws-sdk";
import { ENV } from "../constants.js";

AWS.config.update({ region: "us-east-2" });

class Logger {

  static config() {
    if (ENV === "production") {
      this.generalLogger.add(new WinstonCloudwatch({
        cloudWatchLogs: new AWS.CloudWatchLogs(),
        logGroupName: "revisto-backend",
        logStreamName: "logs starting from " + new Date().toISOString(),
      }));
    }
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
      winston.format.timestamp(),
      this.logFormat
    ),
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.timestamp(),
          this.logFormat
        )
      })
    ]
  });
}

Logger.config();

export const requestLogger = Logger.requestLogger;
export const errorLogger = Logger.errorLogger;

export default Logger.generalLogger;