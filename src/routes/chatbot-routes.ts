import { controller } from '@handlers/chatbot/controller';
import * as validate from '@handlers/chatbot/validator';
import { middleware } from '@lib/middlewares/auth.middleware';
import { verifyErrors } from '@lib/middlewares/validation.middleware';

import { chatbotRouter } from '@helpers/constants';

chatbotRouter.post(
  '/generate/query',
  middleware.authorizehWrite,
  validate.queryValdiator,
  verifyErrors,
  controller.generateQuery
);

export default chatbotRouter;
