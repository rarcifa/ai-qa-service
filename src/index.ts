import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

import { logger } from '#src/helpers/logger.js';

import * as routes from '#src/routes/index.js';

const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }));
app.use(cors());

/* routing setup */
routes.register(app);

app.listen(port, async () => {
  logger.info(`Running on ${port}`);
});


