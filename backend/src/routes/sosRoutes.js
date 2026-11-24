import express from 'express';
import { db } from '../db/database.js';
import { authenticateUser } from '../middleware/auth.js';

const router = express.Router();
router.use(authenticateUser);

// GET /api/sos - Get emergency crisis hotlines and immediate steps
router.get('/', (req, res) => {
  try {
    const resources = db.getSosResources();
    res.json({
      title: "Immediate Help & Crisis Support",
      message: "If you are in immediate danger or having thoughts of self-harm, please connect with a trained professional right away. You are not alone.",
      resources,
      immediateGroundingExercise: {
        name: "Box Breathing 4-4-4-4",
        instruction: "Breathe in slowly for 4 seconds... hold for 4 seconds... breathe out slowly for 4 seconds... hold for 4 seconds."
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/sos/alert-circle - Broadcast emergency alert to user's trusted circle
router.post('/alert-circle', (req, res) => {
  try {
    const circle = db.getSupportCircle(req.user.id);
    const notifications = circle.map(contact => 
      db.recordSupportRequest(req.user.id, contact.id, "Urgent support requested via MindEase SOS.")
    );

    res.json({
      message: `Support alerts sent to ${circle.length} contact(s) in your trusted circle.`,
      dispatchedCount: circle.length,
      notifications
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
