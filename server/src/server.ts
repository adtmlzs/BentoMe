import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { env } from './config/env';
import { connectDB } from './config/db';
import { logger } from './config/logger';
import { errorHandler } from './middleware/errorHandler';
import { rateLimiter } from './middleware/rateLimiter';
import routes from './routes';

const app = express();

// ─── Middleware ─────────────────────────────────────────────────────
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(express.json({ limit: '1mb' }));
app.use(rateLimiter);

// ─── Request Logging ───────────────────────────────────────────────
app.use((req, _res, next) => {
  logger.info({ method: req.method, url: req.url }, 'Incoming request');
  next();
});

// ─── Health Check ──────────────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ─── API Routes ────────────────────────────────────────────────────
app.use('/api', routes);

// ─── Error Handler (must be last) ──────────────────────────────────
app.use(errorHandler);

// ─── Start ─────────────────────────────────────────────────────────
async function start(): Promise<void> {
  await connectDB();

  app.listen(env.PORT, () => {
    logger.info(`🚀 Server running on http://localhost:${env.PORT}`);
    logger.info(`📦 Environment: ${env.NODE_ENV}`);
  });
}

start().catch((error) => {
  logger.error(error, 'Failed to start server');
  process.exit(1);
});
