import express from 'express';
import { db } from '../db/database.js';
import { authenticateUser } from '../middleware/auth.js';

const router = express.Router();
router.use(authenticateUser);

// GET /api/journals - Get all journal entries
router.get('/', (req, res) => {
  try {
    const entries = db.getJournals(req.user.id);
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/journals/prompts - List helpful reflective prompts
router.get('/prompts', (req, res) => {
  res.json([
    "What is on your mind?",
    "What are you grateful for today?",
    "What made you feel good today?",
    "What would you like to let go of?",
    "How does your body feel in this exact moment?",
    "What is one kind thought you can offer yourself today?"
  ]);
});

// GET /api/journals/:id - Get single entry
router.get('/:id', (req, res) => {
  try {
    const entry = db.getJournalById(req.user.id, req.params.id);
    if (!entry) {
      return res.status(404).json({ error: 'Journal entry not found.' });
    }
    res.json(entry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/journals - Create new entry
router.post('/', (req, res) => {
  try {
    const { title, content, moodTag, promptsAnswered } = req.body;
    if (!content && !title) {
      return res.status(400).json({ error: 'Journal entry content or title is required.' });
    }

    const entry = db.createJournal(req.user.id, {
      title,
      content,
      moodTag,
      promptsAnswered
    });

    res.status(201).json({
      message: 'Journal entry saved.',
      entry
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/journals/:id - Update entry
router.put('/:id', (req, res) => {
  try {
    const updated = db.updateJournal(req.user.id, req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Journal entry not found.' });
    }
    res.json({
      message: 'Journal entry updated.',
      entry: updated
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/journals/:id - Delete entry
router.delete('/:id', (req, res) => {
  try {
    const success = db.deleteJournal(req.user.id, req.params.id);
    if (!success) {
      return res.status(404).json({ error: 'Journal entry not found.' });
    }
    res.json({ message: 'Journal entry deleted.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
