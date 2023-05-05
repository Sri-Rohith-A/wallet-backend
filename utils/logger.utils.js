const { createLogger, format, transports } = require("winston");
require("winston-daily-rotate-file");
const constants = require("../constants/constants");

/**
 * Winston logger instance is used to log info, warn and error messages
 */
const logger = createLogger({
    transports: [
        new transports.DailyRotateFile({
            filename: "logs/server-%DATE%-info.log",
            datePattern: "YYYY-MM-DD",
            level: "info",
            zippedArchive: true,
            maxFiles: constants.MAX_FILES,
            format: format.combine(
                format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
                format.align(),
                format.printf((info) => (info.level === "info" ? `${info.level}:\t${[info.timestamp]}: ${info.message}` : ""))
            ),
        }),
        new transports.DailyRotateFile({
            filename: "logs/server-%DATE%-warn.log",
            datePattern: "YYYY-MM-DD",
            level: "warn",
            zippedArchive: true,
            maxFiles: constants.MAX_FILES,
            format: format.combine(
                format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
                format.align(),
                format.printf((warn) => (warn.level === "warn" ? `${warn.level}:\t${[warn.timestamp]}: ${warn.message}` : ""))
            ),
        }),
        new transports.DailyRotateFile({
            filename: "logs/server-%DATE%-error.log",
            datePattern: "YYYY-MM-DD",
            level: "error",
            zippedArchive: true,
            maxFiles: constants.MAX_FILES,
            format: format.combine(
                format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
                format.align(),
                format.printf((error) => (error.level === "error" ? `${error.level}:\t${[error.timestamp]}: ${error.message}` : ""))
            ),
        }),
    ],
});

module.exports = logger;
