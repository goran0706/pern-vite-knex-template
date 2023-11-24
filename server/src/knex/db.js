import knex from 'knex';
import knexConfig from './knexfile';
import config from '../config';

const environment = config.nodeMode;
const db = knex(knexConfig[environment]);

export default db;
