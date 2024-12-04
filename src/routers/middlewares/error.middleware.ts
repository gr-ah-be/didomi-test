/* istanbul ignore file */

import { NextFunction, Request, Response } from 'express';
import { logger } from '../../config/logger';
import { DatabaseError, ValidationError } from 'sequelize';

// Global error handler
export const errorHandler = (
  err: Error & { statusCode?: number },
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  let statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  // Handle custom errors
  if (err instanceof ValidationError) {
    statusCode = 422;
  } else if (err instanceof DatabaseError) {
    statusCode = 500;
  }

  // Log the error for debugging
  logger.error({
    message: err.message,
    stack: err.stack,
    statusCode,
    timestamp: new Date().toISOString(),
  });

  res.status(statusCode).send({
    status: 'error',
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }), // Include stack trace in development mode
  });
};
