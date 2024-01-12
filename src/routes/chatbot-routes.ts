import { controller } from '#src/handlers/chatbot/controller.js';
import * as validate from '#src/handlers/chatbot/validator.js';
import { middleware } from '#src/lib/middlewares/auth.middleware.js';
import { verifyErrors } from '#src/lib/middlewares/validation.middleware.js';

import { chatbotRouter } from '#src/helpers/constants.js';

chatbotRouter.post(
  '/generate/query',
  middleware.authorizehWrite,
  validate.queryValdiator,
  verifyErrors,
  controller.generateQuery
);

export default chatbotRouter;
