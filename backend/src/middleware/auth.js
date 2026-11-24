import jwt from 'jsonwebtoken';
import { config } from '../config/index.js';
import { db } from '../db/database.js';

export function authenticateUser(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    // If no token provided, fallback to demo/guest user for smooth developer and prototype experience
    const demoUser = db.getUserById('usr_default_demo');
    req.user = demoUser || { id: 'usr_default_demo', name: 'User', email: 'user@mindease.com' };
    return next();
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    const user = db.getUserById(decoded.id);
    if (!user) {
      return res.status(401).json({ error: 'User not found or session expired.' });
    }
    req.user = user;
    next();
  } catch (err) {
    // If token invalid, fall back to guest session
    req.user = { id: 'usr_default_demo', name: 'User', email: 'user@mindease.com' };
    next();
  }
}
