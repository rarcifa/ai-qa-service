import { NextFunction, Request, Response } from 'express';
import { Result, ValidationError, validationResult } from 'express-validator';

import { HTTP_CODES, VerificationErrorModel } from '#src/lib/interfaces/status.js';

/**
 * Middleware for checking and handling validation errors in an Express request.
 * This function inspects the request for any validation errors (typically added by previous validation middleware).
 *
 * @param {Request} req - The Express request object containing the request data and validation results.
 * @param {Response} res - The Express response object used for sending back responses.
 * @param {NextFunction} next - The next middleware function in the Express routing pipeline.
 * @returns {void | Response} If validation errors are present, returns a response with error details; otherwise, proceeds to the next middleware.
 *
 * @error
 * If there's an error in processing the function (e.g. layer failure or bad input),
 * the function responds with a 500 Internal Server Error status and a descriptive error message.
 *
 * @example
 * router.post('/register', verifyErrors, ...);
 */
export const verifyErrors = (req: Request, res: Response, next: NextFunction): void | Response => {
  const errors: Result<ValidationError> = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors: VerificationErrorModel[] = [];
  errors.array().map((e: ValidationError) => extractedErrors.push({ [e.param]: e.msg }));

  return res.status(HTTP_CODES.UNPROCESSABLE_ENTITY).json({
    errors: extractedErrors,
  });
};
