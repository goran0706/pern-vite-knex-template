import 'dotenv/config';
import rateLimit from 'express-rate-limit';
import path from 'path';

const {
  NODE_ENV = 'development',
  HTTP_PORT = '8080',
  HTTPS_PORT = '8433',
  HOSTNAME = 'localhost',
  ALLOWED_ORIGIN = 'http://localhost:5173, http://localhost:8080, https://localhost:8433',
  SSL_KEY_PATH = path.resolve(__dirname, '../../ssl/key.pem'),
  SSL_CERT_PATH = path.resolve(__dirname, '../../ssl/cert.pem'),
  JWT_SECRET = '825cb8c25cfdbbf313f65eea010b2883788683438f25fa79edb5daccf1e9f750',
  JWT_EXPIRES_IN = '1h',
  DATABASE_NAME = 'knex_demo',
  DATABASE_CONNECTION_STRING = 'postgres://localhost/knex_demo',
  POSTGRES_HOST = 'localhost',
  POSTGRES_PORT = '5432',
  POSTGRES_USER = 'postgres',
  POSTGRES_USER_PWD = 'postgres',
} = process.env;

const config = {
  nodeMode: NODE_ENV,
  httpPort: HTTP_PORT,
  httpsPort: HTTPS_PORT,
  hostname: HOSTNAME,
  allowedOrigins: ALLOWED_ORIGIN.split(','),
  sslKeyPath: SSL_KEY_PATH,
  sslCertPath: SSL_CERT_PATH,
  jwtSecret: JWT_SECRET,
  jwtExpiresIn: JWT_EXPIRES_IN,
  databaseName: DATABASE_NAME,
  databaseConnectionString: DATABASE_CONNECTION_STRING,
  postgresHost: POSTGRES_HOST,
  postgresPort: POSTGRES_PORT,
  postgresUser: POSTGRES_USER,
  postgresUserPwd: POSTGRES_USER_PWD,
  rateLimit: rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    // store: ... , // Use an external store for consistency across multiple server instances.
  }),
};

export default config;
