import { Sequelize } from 'sequelize-typescript';

import { logger } from '@helpers/logger';

/**
 * Asynchronously verifies the status of the database connection using a provided Sequelize instance.
 * This function performs two main operations:
 *
 * 1. It attempts to authenticate with the database using the Sequelize instance, ensuring that the connection parameters are correct.
 * 2. If authentication succeeds, it then tries to synchronize the Sequelize model with the database, which tests the integrity of the connection.
 *
 * @param {Sequelize} sequelize - The Sequelize instance used for establishing and testing the database connection.
 * @returns {Promise<boolean>} A promise that resolves to `true` or `false` while connecting to the db.
 *
 * @error
 * If there's an error in processing the function (e.g. layer failure or bad input),
 * the function responds with a 500 Internal Server Error status and a descriptive error message.
 *
 * @example
 * const sequelizeInstance = new Sequelize('mysql://user:pass@localhost:3306/dbname');
 * checkDatabaseConnection(sequelizeInstance)
 */
export const checkDatabaseConnection = async (sequelize: Sequelize): Promise<boolean> => {
  try {
    await sequelize.authenticate();
    logger.info('Sequelize is initialized, and the database connection is established.');

    await sequelize.sync();
    logger.info('Database connection test successful.');

    return true;
  } catch (e) {
    logger.error('Error initializing Sequelize or testing the database connection:', e);
    return false;
  }
};
