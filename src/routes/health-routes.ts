import * as controller from '@handlers/healthCheck/controller';
import { verifyErrors } from '@lib/middlewares/validation.middleware';

import { healthRouter } from '@helpers/constants';

healthRouter.get('/', verifyErrors, controller.healthCheck);

export default healthRouter;
