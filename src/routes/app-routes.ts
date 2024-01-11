import { controller } from '@handlers/apps/controller';
import * as validate from '@handlers/apps/validator';
import { middleware } from '@lib/middlewares/auth.middleware';
import { verifyErrors } from '@lib/middlewares/validation.middleware';

import { appRouter } from '@helpers/constants';

appRouter.post(
  '/generate/query',
  middleware.authorizehWrite,
  validate.queryValdiator,
  verifyErrors,
  controller.generateQuery
);

export default appRouter;
