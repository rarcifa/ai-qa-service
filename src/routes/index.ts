import appRoutes from '@routes/app-routes';
import healthRoutes from '@routes/health-routes';
import * as express from 'express';

/**
 * Registers routes and middleware on the provided Express application.
 * This function is responsible for setting up various routes and middleware that the application will use.
 *
 * @param {express.Application} app - The Express application instance on which routes and middleware are to be registered.
 * @returns {void} This function does not return anything.
 *
 * @example
 * const app = express();
 * register(app);
 */
export const register = (app: express.Application): void => {
  app.get('/');
  app.use('(/api)?/v1/chatbot-service', appRoutes);
  app.use('/healthcheck', healthRoutes);
};
