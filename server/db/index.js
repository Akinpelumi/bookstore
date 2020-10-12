import promise from 'bluebird';
import pg from 'pg-promise';
import config from '../config';

import {
  userQueries,
  organizationQueries,
  adminQueries
} from './queries/v1';

const options = {
  promiseLib: promise
};
const pgp = pg(options);
const db = pgp(config.DATABASE_URL);

export {
  db,
  userQueries,
  organizationQueries,
  adminQueries
};
