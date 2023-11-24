import log from '../logger';
import { UnauthorizedError } from 'express-jwt';

// Middleware for logging errors
export const errorLogger = (err, req, res, next) => {
  log.error(err.stack);
  next(err);
};

const handleValidationErrors = (err, res) => {
  const status = err.status || 400;
  const error = err.detail || 'Validation Error';
  res.status(status).json({ success: false, error: error });
};

const handleAuthorizationErrors = (err, res) => {
  const status = err.status || 500;
  const error = err.message || 'Authorization Error';
  res.status(status).json({ success: false, error: error });
};

const handleGenericError = (err, res) => {
  const status = err.status || err.code || 500;
  const error = 'Internal Server Error';
  res.status(status).json({ success: false, error: error });
};

// Middleware for handling errors
export const errorHandler = (err, req, res, next) => {
  if (err instanceof UnauthorizedError) {
    handleAuthorizationErrors(err, res);
  } else if ('detail' in err) {
    handleValidationErrors(err, res);
  } else {
    handleGenericError(err, res);
  }
};

export const handleServiceError = (operation, err, details = '') => {
  const errorMessage = `Error ${operation}: ${err.message}${
    details ? ` (${details})` : ''
  }`;
  log.error(errorMessage);
  throw new Error(errorMessage);
};
