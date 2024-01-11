import { Request, Response } from 'express';

import { service } from '@services/chatbot';

import { HTTP_CODES, HTTP_STATUS } from '@lib/interfaces/status';

/**
 * Controller object for managing query-related operations in an Express application.
 *
 * @fileoverview This file contains functions that act as middleware between the HTTP interface and service logic, specifically for handling query operations.
 * @namespace controller
 */
export const controller = {
  /**
   * Asynchronous controller function to generate a query using the langchain module.
   * This function extracts the query from the request body and uses the 'service' module to process it.
   *
   * @async
   * @param {Request} req - The Express request object containing the query data in its body.
   * @param {Response} res - The Express response object used for sending back the processed query result or error.
   * @returns {Promise<Response>} A promise that resolves with a response object containing the query result or an error message.
   *
   * @error
   * If there's an error in processing the function (e.g. layer failure or bad input),
   * the function responds with a 500 Internal Server Error status and a descriptive error message.
   *
   * @example
   * router.post('/generate-query', controller.generateQuery);
   *
   */
  generateQuery: async (req: Request, res: Response): Promise<Response> => {
    try {
      const query = req.body.query;
      const response = await service.generateQuery(query);
      return res.status(HTTP_CODES.CREATED).json({ status: HTTP_STATUS.SUCCESS, data: response });
    } catch (e) {
      return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({ status: HTTP_STATUS.FAILED, error: e.message });
    }
  },
};
