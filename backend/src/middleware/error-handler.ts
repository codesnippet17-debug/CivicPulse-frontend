import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { AppError } from "../utils/app-error.js";

export const notFound: ErrorRequestHandler = (req, _res, next) => next(new AppError(404, `Route ${req.method} ${req.path} was not found`));
export const errorHandler: ErrorRequestHandler = (error, req, res, _next) => {
  const isValidationError = error instanceof ZodError;
  const status = error instanceof AppError ? error.statusCode : isValidationError ? 400 : 500;
  if (status === 500) console.error(`[${req.requestId}]`, error);
  res.status(status).json({ error: error instanceof AppError ? error.message : isValidationError ? "Invalid request data" : "Unexpected server error", details: error instanceof AppError ? error.details : isValidationError ? error.flatten() : undefined, requestId: req.requestId });
};
