import * as controller from '#src/handlers/healthCheck/controller.js';
import { verifyErrors } from '#src/lib/middlewares/validation.middleware.js';

import { healthRouter } from '#src/helpers/constants.js';

healthRouter.get('/', verifyErrors, controller.healthCheck);

export default healthRouter;
