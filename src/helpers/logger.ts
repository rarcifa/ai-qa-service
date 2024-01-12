import winston, { createLogger, format, transports } from 'winston';

import { IS_PROD_ENV } from '#src/helpers/constants.js';

/**
 * A Winston log format wrapper that modifies log information for error objects.
 * This formatter checks if the logged information is an instance of Error and, if so, updates its 'message' property to include the stack trace.
 *
 * @param {winston.Logform.TransformableInfo} info - Log information that may contain an error object.
 * @returns {winston.Logform.TransformableInfo} The transformed log information.
 */
export const enumerateErrorFormat: winston.Logform.FormatWrap = format((info: winston.Logform.TransformableInfo) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

/**
 * Configures and exports a Winston logger instance.
 * The logger is set up with different levels and formats based on the production or development environment.
 *
 * @type {winston.Logger}
 */
export const logger: winston.Logger = createLogger({
  level: IS_PROD_ENV ? 'info' : 'debug',
  format: format.combine(
    enumerateErrorFormat(),
    IS_PROD_ENV ? format.colorize() : format.uncolorize(),
    format.splat(),
    format.printf(({ level, message }) => `${level}: ${message}`)
  ),
  transports: [
    new transports.Console({
      stderrLevels: ['error'],
    }),
  ],
});
