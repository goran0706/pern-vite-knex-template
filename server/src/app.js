/* -------------------------------------------------------------------------- */
/*                                Externals                                   */
/* -------------------------------------------------------------------------- */
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';

/* -------------------------------------------------------------------------- */
/*                                Modules                                     */
/* -------------------------------------------------------------------------- */
import config from './config';
import { errorHandler, errorLogger } from './modules/error';

/* -------------------------------------------------------------------------- */
/*                                Routes                                      */
/* -------------------------------------------------------------------------- */
import authRoutes from './modules/auth/authRoutes';
import postRoutes from './modules/post/postRoutes';
import userRoutes from './modules/user/userRoutes';

const { allowedOrigins, rateLimit, hostname, httpsPort, nodeMode } = config;

const initializeMiddlewares = (app) => {
  // The order of middleware in an Express application matters,
  // and the placement of middleware can impact how requests are processed.
  // Security Middlewares:
  app.use(helmet()); // Adds various HTTP headers for security.
  app.use(rateLimit); // Limits the rate of requests to your server to mitigate brute-force attacks.
  // Logging and Compression:
  app.use(morgan('dev')); // Logs HTTP requests for debugging purposes.
  app.use(compression()); // Compresses response data before sending it to the client.
  // CORS:
  app.use(cors({ origin: allowedOrigins, credentials: true })); // Handles Cross-Origin Resource Sharing headers.
  // Body Parsers:
  app.use(express.urlencoded({ limit: '5MB', extended: true })); // Parses URL-encoded data.
  app.use(express.json()); // Parses JSON data.
  app.use(express.text()); // Parses text data.
  app.use(express.raw()); // Parses raw data.
  // Cookie Parser:
  app.use(cookieParser()); // Parses cookies attached to the client's request.
  // Static Files:
  app.use(express.static(`${__dirname}/dist`)); // Serves static files (like images, CSS, JS, etc.).
};

const initializeRoutes = (app) => {
  app.use('/', authRoutes);
  app.use('/', userRoutes);
  app.use('/', postRoutes);
};

const initializeErrorHandling = (app) => {
  // Error logging middleware
  app.use(errorLogger);
  // Error handling middleware
  app.use(errorHandler);
};

const redirectHttpToHttps = (req, res, next) => {
  const isProduction = nodeMode === 'production';
  const isHttpProtocol = req.protocol === 'http';
  if (isProduction && isHttpProtocol) {
    const redirectTo = `https://${hostname}:${httpsPort}${req.url}`;
    return res.redirect(301, redirectTo);
  } else {
    // continue to the next request handler
    next();
  }
};

export const setupExpressApp = () => {
  const app = express();

  // Redirect HTTP to HTTPS in production
  app.use(redirectHttpToHttps);

  initializeMiddlewares(app);
  initializeRoutes(app);
  initializeErrorHandling(app);

  return app;
};

export default setupExpressApp();
