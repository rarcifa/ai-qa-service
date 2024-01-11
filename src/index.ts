import moduleAlias from 'module-alias';

moduleAlias.addAliases({
  '@handlers': `${__dirname}/handlers`,
  '@helpers': `${__dirname}/helpers`,
  '@lib': `${__dirname}/lib`,
  '@config': `${__dirname}/config`,
  '@services': `${__dirname}/services`,
  '@repositories': `${__dirname}/repositories`,
  '@integrations': `${__dirname}/integrations`,
  '@routes': `${__dirname}/routes`,
});

import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

import { logger } from './helpers/logger';

import * as routes from './routes';

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


