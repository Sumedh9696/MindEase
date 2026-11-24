import express from 'express';
import { db } from '../db/database.js';
import { authenticateUser } from '../middleware/auth.js';
import { generateMindMateResponse } from '../services/mindmateService.js';

const router = express.Router();
router.use(authenticateUser);

// GET /api/mindmate/prompts - Quick prompt chips
router.get('/prompts', (req, res) => {
  res.json([
    { id: 'p_stressed', label: "I'm stressed", message: "I am feeling stressed and overwhelmed right now." },
    { id: 'p_relax', label: "Help me relax", message: "Can you guide me with a quick relaxing suggestion?" },
    { id: 'p_anxious', label: "I feel anxious", message: "I'm feeling anxious and need to ground myself." }
  ]);
});

// GET /api/mindmate/history - Chat message history
router.get('/history', (req, res) => {
  try {
    const history = db.getChatHistory(req.user.id);
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/mindmate/chat - Send message and get response
router.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message || message.trim() === '') {
      return res.status(400).json({ error: 'Message cannot be empty.' });
    }

    // Save user message
    const userMsg = db.addChatMessage(req.user.id, 'user', message);

    // Generate AI empathetic reply
    const replyText = await generateMindMateResponse(message);

    // Save assistant reply
    const assistantMsg = db.addChatMessage(req.user.id, 'assistant', replyText);

    res.json({
      userMessage: userMsg,
      reply: assistantMsg
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
