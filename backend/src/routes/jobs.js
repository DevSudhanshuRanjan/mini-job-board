// backend/src/routes/jobs.js
import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import {
  getAllJobs,
  getJobById,
  createJob,
  deleteJob,
  getMyJobs,
} from '../controllers/jobsController.js';
import { requireAuth } from '../middleware/authMiddleware.js';
import { jobValidationRules, handleValidationErrors } from '../middleware/validateJob.js';

const router = Router();

// Stricter limit for POST (job creation) to prevent spam
const postLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10,
  message: { success: false, message: 'Post limit reached. You can post up to 10 jobs per hour.' },
});

// ── Public routes ─────────────────────────────────────────────────
// GET /api/jobs?type=Remote&search=engineer&page=1
router.get('/', getAllJobs);

// GET /api/jobs/mine  — must be BEFORE /:id to avoid route conflict
router.get('/mine', requireAuth, getMyJobs);

// GET /api/jobs/:id
router.get('/:id', getJobById);

// ── Protected routes ──────────────────────────────────────────────
// POST /api/jobs
router.post(
  '/',
  postLimiter,
  requireAuth,
  jobValidationRules,
  handleValidationErrors,
  createJob
);

// DELETE /api/jobs/:id
router.delete('/:id', requireAuth, deleteJob);

export default router;
