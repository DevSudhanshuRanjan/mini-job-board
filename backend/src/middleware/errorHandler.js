// backend/src/middleware/errorHandler.js
import { sendError } from '../utils/response.js';

/**
 * Global Express error handler.
 * Catches all errors thrown via next(err) or unhandled throws.
 */
export const errorHandler = (err, req, res, next) => {
  console.error(`[ERROR] ${req.method} ${req.path} →`, err.message);

  // Supabase-specific errors
  if (err.code === 'PGRST116') {
    return sendError(res, 404, 'Resource not found');
  }

  // Validation errors (express-validator)
  if (err.type === 'validation') {
    return sendError(res, 422, 'Validation failed', err.errors);
  }

  // JWT / Auth errors
  if (err.message?.includes('JWT') || err.message?.includes('token')) {
    return sendError(res, 401, 'Invalid or expired authentication token');
  }

  // Default: 500
  const status  = err.status || err.statusCode || 500;
  const message = process.env.NODE_ENV === 'production'
    ? 'An internal server error occurred'
    : err.message || 'Internal Server Error';

  return sendError(res, status, message);
};
