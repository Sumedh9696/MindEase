import express from 'express';
import { db } from '../db/database.js';
import { authenticateUser } from '../middleware/auth.js';

const router = express.Router();
router.use(authenticateUser);

// GET /api/resources/categories
router.get('/categories', (req, res) => {
  res.json([
    'All',
    'Exam Stress',
    'Sleep',
    'Anxiety Support',
    'Emotional Wellbeing',
    'Mindfulness',
    'Self-Care',
    'Relationships',
    'Productivity'
  ]);
});

// GET /api/resources - List articles with optional category & search filter
router.get('/', (req, res) => {
  try {
    const { category, search } = req.query;
    const resources = db.getResources({ category, search });
    const bookmarkedList = db.getBookmarks(req.user.id);
    const bookmarkedIds = new Set(bookmarkedList.map(b => b.id));

    const responseData = resources.map(r => ({
      ...r,
      isBookmarked: bookmarkedIds.has(r.id)
    }));

    res.json(responseData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/resources/bookmarks - Get user bookmarked articles
router.get('/bookmarks', (req, res) => {
  try {
    const bookmarks = db.getBookmarks(req.user.id);
    res.json(bookmarks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/resources/:id/bookmark - Toggle bookmark for article
router.post('/:id/bookmark', (req, res) => {
  try {
    const result = db.toggleBookmark(req.user.id, req.params.id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
