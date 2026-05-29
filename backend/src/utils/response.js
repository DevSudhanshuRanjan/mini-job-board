// backend/src/utils/response.js

/**
 * Send a successful response.
 * @param {import('express').Response} res
 * @param {number} status   HTTP status code (default 200)
 * @param {string} message  Human-readable success message
 * @param {*}      data     Response payload
 * @param {object} meta     Optional pagination/meta object
 */
export const sendSuccess = (res, status = 200, message = 'Success', data = null, meta = null) => {
  const body = {
    success: true,
    message,
    ...(data !== null && { data }),
    ...(meta !== null && { meta }),
    timestamp: new Date().toISOString(),
  };
  return res.status(status).json(body);
};

/**
 * Send an error response.
 * @param {import('express').Response} res
 * @param {number} status   HTTP status code
 * @param {string} message  Human-readable error message
 * @param {*}      errors   Optional validation errors array
 */
export const sendError = (res, status = 500, message = 'Internal Server Error', errors = null) => {
  const body = {
    success: false,
    message,
    ...(errors && { errors }),
    timestamp: new Date().toISOString(),
  };
  return res.status(status).json(body);
};
