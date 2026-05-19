import { Request, Response, NextFunction } from 'express';
import { logger } from '../config/logger';

interface AppError extends Error {
  statusCode?: number;
  errors?: Record<string, string[]>;
}

export function errorHandler(err: AppError, _req: Request, res: Response, _next: NextFunction): void {
  const statusCode = err.statusCode ?? 500;
  const message = statusCode === 500 ? 'Internal server error' : err.message;

  if (statusCode === 500) {
    logger.error({ err }, 'Unhandled server error');
  } else {
    logger.warn({ statusCode, message: err.message }, 'Client error');
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(err.errors && { errors: err.errors }),
  });
}
