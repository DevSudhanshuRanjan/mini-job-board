// backend/src/middleware/validateJob.js
import { body, validationResult } from 'express-validator';
import { sendError } from '../utils/response.js';

// ── Validation rules for creating a job ──────────────────────────
export const jobValidationRules = [
  body('title')
    .trim()
    .notEmpty().withMessage('Job title is required.')
    .isLength({ min: 3, max: 120 }).withMessage('Title must be between 3 and 120 characters.'),

  body('company')
    .trim()
    .notEmpty().withMessage('Company name is required.')
    .isLength({ min: 2, max: 80 }).withMessage('Company name must be between 2 and 80 characters.'),

  body('location')
    .trim()
    .notEmpty().withMessage('Location is required.')
    .isLength({ min: 2, max: 80 }).withMessage('Location must be between 2 and 80 characters.'),

  body('type')
    .trim()
    .notEmpty().withMessage('Job type is required.')
    .isIn(['Remote', 'On-site', 'Hybrid']).withMessage('Type must be one of: Remote, On-site, Hybrid.'),

  body('description')
    .trim()
    .notEmpty().withMessage('Job description is required.')
    .isLength({ min: 20, max: 5000 }).withMessage('Description must be between 20 and 5000 characters.'),

  body('salary_range')
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .isLength({ max: 60 }).withMessage('Salary range must not exceed 60 characters.'),

  body('tags')
    .optional({ nullable: true })
    .isArray({ max: 10 }).withMessage('Tags must be an array of up to 10 items.')
    .custom((tags) => tags.every(t => typeof t === 'string' && t.length <= 30))
    .withMessage('Each tag must be a string of up to 30 characters.'),

  body('apply_url')
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .isURL({ protocols: ['http', 'https'] }).withMessage('Apply URL must be a valid URL (http/https).'),
];

// ── Middleware that checks validation results ─────────────────────
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return sendError(
      res,
      422,
      'Validation failed. Please fix the errors below.',
      errors.array().map(e => ({ field: e.path, message: e.msg }))
    );
  }
  next();
};
