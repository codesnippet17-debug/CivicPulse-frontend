"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.notFound = void 0;
const zod_1 = require("zod");
const app_error_js_1 = require("../utils/app-error.js");
const notFound = (req, _res, next) => next(new app_error_js_1.AppError(404, `Route ${req.method} ${req.path} was not found`));
exports.notFound = notFound;
const errorHandler = (error, req, res, _next) => {
    const isValidationError = error instanceof zod_1.ZodError;
    const status = error instanceof app_error_js_1.AppError ? error.statusCode : isValidationError ? 400 : 500;
    if (status === 500)
        console.error(`[${req.requestId}]`, error);
    res.status(status).json({ error: error instanceof app_error_js_1.AppError ? error.message : isValidationError ? "Invalid request data" : "Unexpected server error", details: error instanceof app_error_js_1.AppError ? error.details : isValidationError ? error.flatten() : undefined, requestId: req.requestId });
};
exports.errorHandler = errorHandler;
