import { AppErrorDetails } from "../types/user";
// AppError is a custom error class
// It extends the built-in Error class
// and allows us to attach an HTTP status code

export class AppError extends Error {
  // HTTP status code (400, 401, 404, 500, etc.)

  statusCode: number;
  errors?: AppErrorDetails;
  isOperational: boolean;

  constructor(message: string, statusCode: number, errors?: AppErrorDetails) {
    // Call the parent Error constructor with the message

    super(message);
    // Assign the HTTP status code to this error

    this.statusCode = statusCode;

    this.errors = errors;
    this.isOperational = true;
    // This is required in TypeScript to fix inheritance from Error
    // Without this, instanceof AppError may not work correctly

    Object.setPrototypeOf(this, AppError.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}
