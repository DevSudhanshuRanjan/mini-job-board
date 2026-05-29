// backend/src/config/env.js
import 'dotenv/config';

const required = [
  'SUPABASE_URL',
  'SUPABASE_SERVICE_ROLE_KEY',
  'SUPABASE_ANON_KEY',
];

for (const key of required) {
  if (!process.env[key]) {
    throw new Error(`[ENV] Missing required environment variable: ${key}`);
  }
}

export const ENV = {
  PORT:                    process.env.PORT || '4000',
  NODE_ENV:                process.env.NODE_ENV || 'development',
  SUPABASE_URL:            process.env.SUPABASE_URL,
  SUPABASE_SERVICE_KEY:    process.env.SUPABASE_SERVICE_ROLE_KEY,
  SUPABASE_ANON_KEY:       process.env.SUPABASE_ANON_KEY,
  ALLOWED_ORIGINS:         (process.env.ALLOWED_ORIGINS || 'http://localhost:5173').split(','),
  RATE_LIMIT_WINDOW_MS:    parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'),
  RATE_LIMIT_MAX_REQUESTS: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
};
