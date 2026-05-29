// backend/src/index.js
import './config/env.js'; // validates env vars first
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { ENV } from './config/env.js';
import jobsRouter from './routes/jobs.js';
import { errorHandler } from './middleware/errorHandler.js';
import { sendSuccess, sendError } from './utils/response.js';

const app = express();

// ── Security Headers ──────────────────────────────────────────────
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
}));

// ── CORS ──────────────────────────────────────────────────────────
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || ENV.ALLOWED_ORIGINS.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS blocked: origin ${origin} not allowed`));
    }
  },
  methods:     ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// ── Rate Limiting ──────────────────────────────────────────────────
const limiter = rateLimit({
  windowMs: ENV.RATE_LIMIT_WINDOW_MS,   // 15 minutes
  max:      ENV.RATE_LIMIT_MAX_REQUESTS, // 100 requests per window
  standardHeaders: true,
  legacyHeaders:   false,
  message: { success: false, message: 'Too many requests. Please try again later.' },
});
app.use(limiter);

// Stricter limit for POST (job creation) to prevent spam
const postLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10,
  message: { success: false, message: 'Post limit reached. You can post up to 10 jobs per hour.' },
});

// ── Body Parsing ───────────────────────────────────────────────────
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// ── Request Logging ────────────────────────────────────────────────
if (ENV.NODE_ENV !== 'test') {
  app.use(morgan(ENV.NODE_ENV === 'development' ? 'dev' : 'combined'));
}

// ── Health Check ───────────────────────────────────────────────────
app.get('/health', (req, res) => {
  return sendSuccess(res, 200, 'Server is healthy', {
    uptime:      process.uptime(),
    environment: ENV.NODE_ENV,
    timestamp:   new Date().toISOString(),
  });
});

// ── API Routes ─────────────────────────────────────────────────────
app.use('/api/jobs', jobsRouter);

// ── 404 Handler ────────────────────────────────────────────────────
app.use((req, res) => {
  return sendError(res, 404, `Route not found: ${req.method} ${req.path}`);
});

// ── Global Error Handler ───────────────────────────────────────────
app.use(errorHandler);

// ── Start Server ───────────────────────────────────────────────────
if (!process.env.VERCEL) {
  const PORT = parseInt(ENV.PORT);
  app.listen(PORT, () => {
    console.log(`\n🚀 Mini Job Board API running on http://localhost:${PORT}`);
    console.log(`   Environment: ${ENV.NODE_ENV}`);
    console.log(`   Health:      http://localhost:${PORT}/health`);
    console.log(`   Jobs API:    http://localhost:${PORT}/api/jobs\n`);
  });
}

export default app;
