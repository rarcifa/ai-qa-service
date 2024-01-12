import { controller } from '#src/handlers/qa/controller.js';
import * as validate from '#src/handlers/qa/validator.js';
import { middleware } from '#src/lib/middlewares/auth.middleware.js';
import { verifyErrors } from '#src/lib/middlewares/validation.middleware.js';

import { qaRouter } from '#src/helpers/constants.js';

qaRouter.post(
  '/generate/query',
  middleware.authorizehWrite,
  validate.queryValdiator,
  verifyErrors,
  controller.generateQuery
);

export default qaRouter;
