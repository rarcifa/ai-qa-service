import { Request, Response } from 'express';

import { HTTP_CODES, HTTP_MESSAGES, HTTP_STATUS } from '@lib/interfaces/status';

/**
 * Asynchronous function for performing a health check of the application.
 * This function generates a health report including the application's uptime, response time, a success message, and the current timestamp.
 *
 * @async
 * @param {Request} _req - The Express request object (unused in this function, hence the underscore prefix).
 * @param {Response} res - The Express response object used to send back the health check data.
 * @returns {Promise<Response>} A promise that resolves with a JSON response containing the health check data.
 *
 * @error
 * If there's an error in processing the function (e.g. layer failure or bad input),
 * the function responds with a 500 Internal Server Error status and a descriptive error message.
 *
 * @example
 * router.get('/healthcheck', healthCheck);
 */
export const healthCheck = async (_req: Request, res: Response): Promise<Response> => {
  const healthcheck = {
    uptime: process.uptime(),
    responsetime: process.hrtime(),
    message: HTTP_MESSAGES.MESSAGE_OK,
    timestamp: Date.now(),
  };
  try {
    return res.status(HTTP_CODES.OK).json({ status: HTTP_STATUS.SUCCESS, data: healthcheck });
  } catch (e) {
    return res.status(HTTP_CODES.SERVICE_UNAVAILABLE).json({ status: HTTP_STATUS.FAILED, error: e.message });
  }
};
