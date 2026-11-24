import express from 'express';
import { db } from '../db/database.js';
import { authenticateUser } from '../middleware/auth.js';

const router = express.Router();
router.use(authenticateUser);

const MOOD_SCORES = {
  'Radiant': 8,
  'Daily Joy': 7,
  'Positive': 6,
  'Calm': 5,
  'Neutral': 4,
  'Anxious': 3,
  'Stressed': 2,
  'Sad': 2,
  'Overwhelmed': 1
};

// GET /api/moods - List all mood entries for user
router.get('/', (req, res) => {
  try {
    const moods = db.getMoodsByUser(req.user.id);
    res.json(moods);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/moods/analytics - Returns daily trend data for the week
router.get('/analytics', (req, res) => {
  try {
    const moods = db.getMoodsByUser(req.user.id);
    const daysOrder = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    // Map days to latest score
    const weeklyData = daysOrder.map(day => {
      const dayMoods = moods.filter(m => m.day === day);
      if (dayMoods.length > 0) {
        const latest = dayMoods[dayMoods.length - 1];
        return {
          day,
          score: latest.score,
          feeling: latest.feeling,
          note: latest.note,
          date: latest.date
        };
      }
      return {
        day,
        score: 5,
        feeling: 'Calm',
        note: '',
        date: null
      };
    });

    const averageScore = Number((weeklyData.reduce((acc, curr) => acc + curr.score, 0) / weeklyData.length).toFixed(1));

    res.json({
      period: 'Last week',
      averageScore,
      trend: weeklyData
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/moods - Log a new mood
router.post('/', (req, res) => {
  try {
    const { feeling, note, day } = req.body;
    if (!feeling) {
      return res.status(400).json({ error: 'Feeling is required.' });
    }

    const calculatedScore = MOOD_SCORES[feeling] || 5;

    const newMood = db.addMood(req.user.id, {
      feeling,
      score: req.body.score || calculatedScore,
      note,
      day
    });

    res.status(201).json({
      message: 'Mood logged successfully.',
      mood: newMood
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
