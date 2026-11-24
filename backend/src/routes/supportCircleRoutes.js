import express from 'express';
import { db } from '../db/database.js';
import { authenticateUser } from '../middleware/auth.js';

const router = express.Router();
router.use(authenticateUser);

// GET /api/support-circle - List user's trusted contacts
router.get('/', (req, res) => {
  try {
    const circle = db.getSupportCircle(req.user.id);
    res.json(circle);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/support-circle - Add new trusted person
router.post('/', (req, res) => {
  try {
    const { name, relation, phone, email, avatar } = req.body;
    if (!name || !relation) {
      return res.status(400).json({ error: 'Name and relation are required.' });
    }

    const contact = db.addSupportContact(req.user.id, {
      name,
      relation,
      phone,
      email,
      avatar
    });

    res.status(201).json({
      message: 'Trusted contact added to your support circle.',
      contact
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/support-circle/:id - Remove contact
router.delete('/:id', (req, res) => {
  try {
    const success = db.deleteSupportContact(req.user.id, req.params.id);
    if (!success) {
      return res.status(404).json({ error: 'Contact not found.' });
    }
    res.json({ message: 'Contact removed from support circle.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/support-circle/:id/request - Dispatch gentle check-in request
router.post('/:id/request', (req, res) => {
  try {
    const { note } = req.body;
    const request = db.recordSupportRequest(req.user.id, req.params.id, note);

    res.json({
      message: `A gentle support request has been sent to ${request.contactName}.`,
      request,
      privacyGuarantee: "No personal thoughts or sensitive medical information were shared."
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
