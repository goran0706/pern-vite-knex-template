const {
  DATABASE_NAME = 'knex_demo',
  DATABASE_CONNECTION_STRING = 'postgres://user:pass@localhost:5432/knex_demo',
  POSTGRES_HOST = 'localhost',
  POSTGRES_PORT = '5432',
  POSTGRES_USER = 'postgres',
  POSTGRES_USER_PWD = 'postgres',
} = process.env;

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: DATABASE_NAME,
      host: POSTGRES_HOST,
      port: POSTGRES_PORT,
      user: POSTGRES_USER,
      password: POSTGRES_USER_PWD,
    },
    migrations: {
      directory: './migrations/',
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: './seeds',
    },
  },

  staging: {
    client: 'postgresql',
    connection: DATABASE_CONNECTION_STRING,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './migrations/',
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: './seeds',
    },
  },

  production: {
    client: 'postgresql',
    connection: DATABASE_CONNECTION_STRING,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './migrations/',
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: './seeds',
    },
  },
};
