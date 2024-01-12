import { logger } from '#src/helpers/logger.js';
import { Dialect } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

import Queries from './models/document.js';

import {
  DB_DIALECT,
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USERNAME,
  IS_PROD_ENV,
} from '#src/helpers/constants.js';

/**
 * Asynchronously checks and verifies the authentication state of the database connection.
 * This function attempts to establish a connection with the database using Sequelize.
 *
 * @async
 * @returns {Promise<boolean>} A promise that resolves to `true` or `false` while connecting to the db.
 *
 * @error
 * If there's an error in processing the function (e.g. layer failure or bad input),
 * the function responds with a 500 Internal Server Error status and a descriptive error message.
 *
 * @example
 * checkAuthState()
 */
export const checkAuthState = async (): Promise<boolean> => {
  try {
    await sequelize.authenticate();
    logger.info('Connection has been established successfully.');
    return true;
  } catch (e) {
    logger.error('Unable to connect to the database:', e);
    return false;
  }
};

export const sequelize = new Sequelize({
  database: DB_NAME,
  dialect: DB_DIALECT as Dialect,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: DB_PORT,
  models: [Queries],
  logging: false,
  dialectOptions: IS_PROD_ENV && {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});
