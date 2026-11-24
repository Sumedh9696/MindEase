import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from './config/index.js';
import authRoutes from './routes/authRoutes.js';
import moodRoutes from './routes/moodRoutes.js';
import breathingRoutes from './routes/breathingRoutes.js';
import journalRoutes from './routes/journalRoutes.js';
import resourceRoutes from './routes/resourceRoutes.js';
import supportCircleRoutes from './routes/supportCircleRoutes.js';
import sosRoutes from './routes/sosRoutes.js';
import mindmateRoutes from './routes/mindmateRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const FRONTEND_DIST = path.join(__dirname, '../../frontend/dist');

const app = express();

// Middlewares
app.use(cors({
  origin: (origin, callback) => {
    // Allow any local origin or requests with no origin
    if (!origin || /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) {
      return callback(null, true);
    }
    return callback(null, true);
  },
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request Logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    app: 'MindEase Backend API',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Mount API Routes
app.use('/api/auth', authRoutes);
app.use('/api/moods', moodRoutes);
app.use('/api/breathing', breathingRoutes);
app.use('/api/journals', journalRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/support-circle', supportCircleRoutes);
app.use('/api/sos', sosRoutes);
app.use('/api/mindmate', mindmateRoutes);

// Serve Static Frontend if built
if (fs.existsSync(FRONTEND_DIST)) {
  app.use(express.static(FRONTEND_DIST));
  app.get('*', (req, res, next) => {
    if (req.url.startsWith('/api')) return next();
    res.sendFile(path.join(FRONTEND_DIST, 'index.html'));
  });
}

// 404 Route Handler for unmatched API routes
app.use((req, res) => {
  res.status(404).json({ error: `Endpoint ${req.method} ${req.originalUrl} not found.` });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message
  });
});

const server = app.listen(config.port, '0.0.0.0', () => {
  console.log(`🌱 MindEase Server is running on http://127.0.0.1:${config.port} (${config.nodeEnv})`);
  console.log(`📡 Healthcheck available at: http://127.0.0.1:${config.port}/api/health`);
});

export default app;
