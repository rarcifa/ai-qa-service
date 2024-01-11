import { body, ValidationChain } from 'express-validator';

export const queryValdiator: ValidationChain[] = [
  body('query', 'query should be a string').optional({ checkFalsy: true }).isString(),
];
