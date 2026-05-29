// backend/src/middleware/authMiddleware.js
import { supabasePublic } from '../config/supabase.js';
import { sendError } from '../utils/response.js';

/**
 * requireAuth — middleware that validates the Bearer JWT.
 * Attaches the decoded user to req.user on success.
 * Returns 401 if token is missing, invalid, or expired.
 */
export const requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return sendError(res, 401, 'Authorization header missing or malformed. Expected: Bearer <token>');
    }

    const token = authHeader.split(' ')[1];

    const { data: { user }, error } = await supabasePublic.auth.getUser(token);

    if (error || !user) {
      return sendError(res, 401, 'Invalid or expired token. Please sign in again.');
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

/**
 * optionalAuth — same as requireAuth but non-blocking.
 * Attaches user if token is valid; continues regardless.
 */
export const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) return next();

    const token = authHeader.split(' ')[1];
    const { data: { user } } = await supabasePublic.auth.getUser(token);
    req.user = user || null;
    next();
  } catch {
    req.user = null;
    next();
  }
};
