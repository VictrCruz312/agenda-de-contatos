import { createLogger, format, transports } from "winston";

const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

const logger = createLogger({
  level: "info",
  format: combine(timestamp(), myFormat),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "logs.log" }),
  ],
});

export default logger;
