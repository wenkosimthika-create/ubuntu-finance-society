import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

interface CustomError extends Error {
  status?: number;
  message: string;
}

export const errorHandler = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = error.status || 500;
  const message = error.message || 'An error occurred';

  logger.error(`[${status}] ${message}`);

  res.status(status).json({
    error: {
      status,
      message,
    },
  });
};
