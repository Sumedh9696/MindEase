import express from 'express';
import { db } from '../db/database.js';
import { authenticateUser } from '../middleware/auth.js';

const router = express.Router();
router.use(authenticateUser);

// GET /api/breathing/presets
router.get('/presets', (req, res) => {
  res.json({
    presets: [
      { id: 'box', name: 'Box Breathing', description: 'Equal inhale, hold, exhale, hold for nervous system equilibrium', pattern: { inhale: 4, hold1: 4, exhale: 4, hold2: 4 } },
      { id: 'relax', name: '4-7-8 Relaxation', description: 'Deep calming technique to reduce heart rate and prepare for rest', pattern: { inhale: 4, hold1: 7, exhale: 8, hold2: 0 } },
      { id: 'balance', name: 'Coherent Breathing', description: 'Smooth, continuous breathing at 5 breaths per minute', pattern: { inhale: 6, hold1: 0, exhale: 6, hold2: 0 } }
    ],
    durationOptionsMinutes: [2, 5, 10]
  });
});

// POST /api/breathing/sessions - Log completed breathing session
router.post('/sessions', (req, res) => {
  try {
    const { durationSeconds, rhythm } = req.body;
    const session = db.addBreathingSession(req.user.id, {
      durationSeconds,
      rhythm
    });

    res.status(201).json({
      message: 'Breathing session logged.',
      session
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
