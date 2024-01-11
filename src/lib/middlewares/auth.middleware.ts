import { NextFunction, Request, Response } from 'express';

import { security } from '@helpers/security';

import { HTTP_CODES, HTTP_MESSAGES, HTTP_STATUS } from '@lib/interfaces/status';

import { CHATBOT_READ_API_SECRET, CHATBOT_WRITE_API_SECRET } from '@helpers/constants';

/**
 * Middleware functions for authorizing read and write operations on a chatbot API.
 *
 * @fileoverview This file contains functions to validate API keys for both read and write access.
 * @namespace middleware
 */
export const middleware = {
  /**
   * Middleware for authorizing read operations. Validates the 'x-api-key' header against the CHATBOT_READ_API_SECRET.
   * If the API key is valid, it allows the request to proceed. Otherwise, it responds with an unauthorized status.
   *
   * @async
   * @param {Request} req - The Express request object containing the headers and other request information.
   * @param {Response} res - The Express response object used for sending back responses.
   * @param {NextFunction} next - The next middleware function in the Express routing pipeline.
   * @returns {Promise<void | Response>} Either proceeds to the next middleware function or returns a response if authorization fails.
   *
   * @example
   * router.get('/data', middleware.authorizeRead, (req, res) => { /* handle the request *\/ });
   */
  authorizehRead: async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
    try {
      const apiKey: string = req.header('x-api-key');
      const isValidApiKey: boolean = security.authenticateApiKey(CHATBOT_READ_API_SECRET, apiKey);

      if (!isValidApiKey) {
        return res.status(HTTP_CODES.UNAUTHORIZED).json({
          status: HTTP_STATUS.FAILED,
          message: HTTP_MESSAGES.INVALID_API_KEY,
        });
      }

      if (isValidApiKey) {
        return next();
      }
    } catch (e) {
      return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({
        status: HTTP_STATUS.FAILED,
        message: HTTP_MESSAGES.AUTHORIZATION_FAILED,
      });
    }
  },

  /**
   * Middleware for authorizing write operations. Validates the 'x-api-key' header against the CHATBOT_WRITE_API_SECRET.
   * If the API key is valid, it allows the request to proceed. Otherwise, it responds with an unauthorized status.
   *
   * @async
   * @param {Request} req - The Express request object containing the headers and other request information.
   * @param {Response} res - The Express response object used for sending back responses.
   * @param {NextFunction} next - The next middleware function in the Express routing pipeline.
   * @returns {Promise<void | Response>} Either proceeds to the next middleware function or returns a response if authorization fails.
   *
   * @error
   * If there's an error in processing the function (e.g. layer failure or bad input),
   * the function responds with a 500 Internal Server Error status and a descriptive error message.
   *
   * @example
   * router.post('/update', middleware.authorizeWrite, (req, res) => { /* handle the request *\/ });
   */
  authorizehWrite: async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
    try {
      const apiKey: string = req.header('x-api-key');
      const isValidApiKey: boolean = security.authenticateApiKey(CHATBOT_WRITE_API_SECRET, apiKey);

      if (!isValidApiKey) {
        return res.status(HTTP_CODES.UNAUTHORIZED).json({
          status: HTTP_STATUS.FAILED,
          message: HTTP_MESSAGES.INVALID_API_KEY,
        });
      }

      if (isValidApiKey) {
        return next();
      }
    } catch (e) {
      return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({
        status: HTTP_STATUS.FAILED,
        message: HTTP_MESSAGES.AUTHORIZATION_FAILED,
      });
    }
  },
};
