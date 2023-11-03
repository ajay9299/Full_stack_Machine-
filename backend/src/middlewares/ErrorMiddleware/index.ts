import { Request, Response, NextFunction } from "express";
import { ResponseMessages } from "../../responses/responses";
import { CelebrateError } from "celebrate";
import { responseMessages, responseStatus } from "../../responses/responseConstants";
// Create response messages instance
const responseMessageInstance = ResponseMessages.getInstance();
interface AppErrorData {
  [key: string]: any;
}

/**
 * AppError class is main class for error throwing in express application
 */
export class AppError extends Error {
  public status: number;
  public data: AppErrorData;

  constructor(message: string, status: number, data: AppErrorData = {}) {
    super(message);
    this.status = status;
    this.data = data;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * ErrorHandler class is act as global error handler middleware for express application based on environment
 */
export class ErrorHandler {
  public static handle(
    err: Error | CelebrateError,
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    let error: AppError;

    if (err instanceof AppError) {
      error = err;
    } else if (err instanceof CelebrateError) {
      const validationErrors: string[] = [];

      err.details.forEach((error: any) => {
        validationErrors.push(error.message);
      });

      error = new AppError(responseMessages.VALIDATION_FAILED, responseStatus.BAD_REQUEST, validationErrors);
    } else {
      // Create a generic error for unhandled exceptions
      error = new AppError(responseMessages.INTERNAL_SERVER_ERROR, responseStatus.INTERNAL_SERVER_ERROR);
    }

    // Customize error message based on environment
    const errorResponse: Record<string, any> = {
      error: error.message,
      data: error.data,
    };

    if (process.env.NODE_ENV === "prod") {
      delete errorResponse.data; // Remove data in production environment
    } else {
      errorResponse.stack = error.stack; // Include stack trace in development environment
    }

    res.status(error.status).json(errorResponse);
  }
}
