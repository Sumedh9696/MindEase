import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, 'data.json');

const INITIAL_DATA = {
  users: [
    {
      id: "usr_default_demo",
      name: "User",
      email: "user@mindease.com",
      // bcrypt hash for "password123"
      passwordHash: "$2a$10$wT0E6aRkWj0mG56kKj1tPeX9UvLq2iGvN2lM5R3oW0uS8vA6gZ7Wy",
      createdAt: new Date().toISOString()
    }
  ],
  moods: [
    { id: "m_1", userId: "usr_default_demo", feeling: "Positive", score: 6, day: "Mon", date: "2026-11-10T09:00:00Z", note: "Feeling energized starting the week" },
    { id: "m_2", userId: "usr_default_demo", feeling: "Daily Joy", score: 7, day: "Tue", date: "2026-11-11T10:30:00Z", note: "Great walk in the park" },
    { id: "m_3", userId: "usr_default_demo", feeling: "Calm", score: 5, day: "Wed", date: "2026-11-12T14:15:00Z", note: "Steady workday, peaceful afternoon" },
    { id: "m_4", userId: "usr_default_demo", feeling: "Anxious", score: 4, day: "Thu", date: "2026-11-13T16:00:00Z", note: "Upcoming deadlines caused mild anxiety" },
    { id: "m_5", userId: "usr_default_demo", feeling: "Positive", score: 6, day: "Fri", date: "2026-11-14T11:45:00Z", note: "Wrapped up tasks for the weekend" },
    { id: "m_6", userId: "usr_default_demo", feeling: "Radiant", score: 8, day: "Sat", date: "2026-11-15T10:00:00Z", note: "Wonderful time with close friends" },
    { id: "m_7", userId: "usr_default_demo", feeling: "Daily Joy", score: 7, day: "Sun", date: "2026-11-16T15:20:00Z", note: "Relaxing Sunday evening" }
  ],
  journals: [
    {
      id: "j_1",
      userId: "usr_default_demo",
      title: "Finding Stillness in the Afternoon",
      content: "Today I took 5 minutes to step away from screens and practice mindful breathing. Noticeable difference in tension around shoulders.",
      moodTag: "Calm",
      promptsAnswered: ["What made you feel good today?"],
      createdAt: "2026-11-16T14:00:00Z",
      updatedAt: "2026-11-16T14:00:00Z"
    }
  ],
  breathingSessions: [
    {
      id: "bs_1",
      userId: "usr_default_demo",
      durationSeconds: 120,
      rhythm: "4-4-4-2",
      completedAt: "2026-11-16T08:30:00Z"
    }
  ],
  resources: [
    {
      id: "res_exam_stress",
      title: "Managing Exam Stress",
      slug: "managing-exam-stress",
      summary: "Simple techniques to reduce stress and improve focus.",
      category: "Exam Stress",
      readTime: "4 min read",
      author: "MindEase Clinical Team",
      content: "Exam periods often bring intense cognitive pressure and anticipatory anxiety. By structuring review into 25-minute Pomodoro cycles and engaging in 3-minute physiological sigh breathing exercises before study blocks, your nervous system remains regulated.",
      tags: ["stress", "focus", "study", "exams"]
    },
    {
      id: "res_sleep_hygiene",
      title: "Sleep Hygiene 101",
      slug: "sleep-hygiene-101",
      summary: "How to create a bedtime routine that actually works.",
      category: "Sleep",
      readTime: "5 min read",
      author: "Dr. Sarah Lin",
      content: "Sleep is the cornerstone of emotional regulation. Establish a wind-down anchor: dim ambient lighting 60 minutes prior, reserve the bed solely for rest, and swap blue-light scrolling for reflective journaling or body scan meditations.",
      tags: ["sleep", "recovery", "routine"]
    },
    {
      id: "res_understanding_anxiety",
      title: "Understanding Anxiety",
      slug: "understanding-anxiety",
      summary: "What anxiety is, why it happens, and how to work with it.",
      category: "Anxiety Support",
      readTime: "6 min read",
      author: "MindEase Clinical Team",
      content: "Anxiety is your body's survival mechanism signaling anticipated threat. Rather than resisting the physical sensations, practicing the 5-4-3-2-1 grounding technique grounds your awareness back into the present reality.",
      tags: ["anxiety", "grounding", "coping"]
    },
    {
      id: "res_power_of_journaling",
      title: "The Power of Journaling",
      slug: "the-power-of-journaling",
      summary: "How writing helps process emotions and reduce overwhelm.",
      category: "Emotional Wellbeing",
      readTime: "3 min read",
      author: "Emma Clarke",
      content: "Expressive writing externalizes thoughts from the prefrontal cortex onto the page. Research shows just 10 minutes of journaling daily significantly lowers cortisol levels and boosts emotional clarity.",
      tags: ["journaling", "reflection", "clarity"]
    },
    {
      id: "res_mindful_breathing",
      title: "Mindful Breathing Techniques",
      slug: "mindful-breathing-techniques",
      summary: "Science-backed breathing patterns for instant calm.",
      category: "Mindfulness",
      readTime: "4 min read",
      author: "Dr. James Park",
      content: "When you lengthen your exhale relative to your inhale, the vagus nerve signals the parasympathetic nervous system to slow heart rate and blood pressure within seconds.",
      tags: ["breathing", "mindfulness", "nervous system"]
    },
    {
      id: "res_healthy_habits",
      title: "Building Healthy Habits",
      slug: "building-healthy-habits",
      summary: "Small changes that compound into lasting wellbeing.",
      category: "Self-Care",
      readTime: "7 min read",
      author: "Wellness Collective",
      content: "Micro-habits minimize willpower friction. Habit stacking—such as drinking a glass of water while saying one positive affirmation every morning—anchors positive routines effortlessly.",
      tags: ["habits", "self-care", "routine"]
    },
    {
      id: "res_difficult_relationships",
      title: "Navigating Difficult Relationships",
      slug: "navigating-difficult-relationships",
      summary: "Setting boundaries and communicating with compassion.",
      category: "Relationships",
      readTime: "5 min read",
      author: "Dr. Linda Gomez",
      content: "Healthy boundaries are not walls; they are clear gates. Communicating personal limits with gentle assertiveness honors your emotional capacity without unnecessary conflict.",
      tags: ["relationships", "boundaries", "communication"]
    }
  ],
  bookmarks: [
    { id: "bm_1", userId: "usr_default_demo", resourceId: "res_exam_stress" }
  ],
  supportCircle: [
    {
      id: "sc_1",
      userId: "usr_default_demo",
      name: "Emma Wilson",
      relation: "Sister",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
      phone: "+1 (555) 234-5678",
      email: "emma.wilson@example.com"
    },
    {
      id: "sc_2",
      userId: "usr_default_demo",
      name: "Dr. James Park",
      relation: "Counsellor",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
      phone: "+1 (555) 876-5432",
      email: "dr.james.park@wellnessclinic.org"
    }
  ],
  supportRequests: [],
  mindmateChats: [
    {
      id: "chat_init",
      userId: "usr_default_demo",
      sender: "assistant",
      message: "Hello! I'm MindMate. I can support you on your wellness journey today. 🧡",
      timestamp: new Date().toISOString()
    }
  ],
  sosResources: [
    {
      name: "National Suicide & Crisis Lifeline",
      contact: "988",
      type: "phone",
      description: "Free, confidential 24/7 support across the US and Canada."
    },
    {
      name: "Crisis Text Line",
      contact: "Text HOME to 741741",
      type: "sms",
      description: "Connect with a volunteer crisis counselor 24/7."
    },
    {
      name: "The Trevor Project (LGBTQ+ Youth)",
      contact: "1-866-488-7386",
      type: "phone",
      description: "Trained counselors available 24/7/365."
    },
    {
      name: "Emergency Services",
      contact: "911 / 112 / 999",
      type: "emergency",
      description: "Immediate local police, medical, or fire emergency."
    }
  ]
};

class Database {
  constructor() {
    this.ensureDbExists();
  }

  ensureDbExists() {
    try {
      if (!fs.existsSync(DB_FILE)) {
        fs.writeFileSync(DB_FILE, JSON.stringify(INITIAL_DATA, null, 2), 'utf-8');
      }
    } catch (err) {
      console.error('Error initializing database file:', err);
    }
  }

  read() {
    try {
      this.ensureDbExists();
      const content = fs.readFileSync(DB_FILE, 'utf-8');
      return JSON.parse(content);
    } catch (err) {
      console.error('Error reading database:', err);
      return INITIAL_DATA;
    }
  }

  write(data) {
    try {
      const tempPath = `${DB_FILE}.tmp`;
      fs.writeFileSync(tempPath, JSON.stringify(data, null, 2), 'utf-8');
      fs.renameSync(tempPath, DB_FILE);
      return true;
    } catch (err) {
      console.error('Error writing to database:', err);
      return false;
    }
  }

  // --- User Helpers ---
  getUserByEmail(email) {
    const db = this.read();
    return db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  getUserById(id) {
    const db = this.read();
    return db.users.find(u => u.id === id);
  }

  createUser(userData) {
    const db = this.read();
    const newUser = {
      id: `usr_${crypto.randomUUID()}`,
      createdAt: new Date().toISOString(),
      ...userData
    };
    db.users.push(newUser);
    this.write(db);
    return newUser;
  }

  // --- Moods Helpers ---
  getMoodsByUser(userId) {
    const db = this.read();
    return db.moods.filter(m => m.userId === userId);
  }

  addMood(userId, { feeling, score, note, day }) {
    const db = this.read();
    const newMood = {
      id: `m_${crypto.randomUUID()}`,
      userId,
      feeling,
      score: Number(score) || 5,
      day: day || new Date().toLocaleDateString('en-US', { weekday: 'short' }),
      date: new Date().toISOString(),
      note: note || ''
    };
    db.moods.push(newMood);
    this.write(db);
    return newMood;
  }

  // --- Journal Helpers ---
  getJournals(userId) {
    const db = this.read();
    return db.journals
      .filter(j => j.userId === userId)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  getJournalById(userId, id) {
    const db = this.read();
    return db.journals.find(j => j.id === id && j.userId === userId);
  }

  createJournal(userId, { title, content, moodTag, promptsAnswered }) {
    const db = this.read();
    const newEntry = {
      id: `j_${crypto.randomUUID()}`,
      userId,
      title: title || 'Untitled Entry',
      content: content || '',
      moodTag: moodTag || 'Calm',
      promptsAnswered: promptsAnswered || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    db.journals.push(newEntry);
    this.write(db);
    return newEntry;
  }

  updateJournal(userId, id, updates) {
    const db = this.read();
    const index = db.journals.findIndex(j => j.id === id && j.userId === userId);
    if (index === -1) return null;

    db.journals[index] = {
      ...db.journals[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    this.write(db);
    return db.journals[index];
  }

  deleteJournal(userId, id) {
    const db = this.read();
    const initialLen = db.journals.length;
    db.journals = db.journals.filter(j => !(j.id === id && j.userId === userId));
    this.write(db);
    return db.journals.length < initialLen;
  }

  // --- Breathing Sessions ---
  addBreathingSession(userId, { durationSeconds, rhythm }) {
    const db = this.read();
    const session = {
      id: `bs_${crypto.randomUUID()}`,
      userId,
      durationSeconds: Number(durationSeconds) || 120,
      rhythm: rhythm || '4-4-4-2',
      completedAt: new Date().toISOString()
    };
    db.breathingSessions.push(session);
    this.write(db);
    return session;
  }

  // --- Resources & Bookmarks ---
  getResources({ category, search }) {
    const db = this.read();
    let results = db.resources;

    if (category && category.toLowerCase() !== 'all') {
      results = results.filter(r => r.category.toLowerCase() === category.toLowerCase());
    }

    if (search && search.trim() !== '') {
      const q = search.toLowerCase();
      results = results.filter(r =>
        r.title.toLowerCase().includes(q) ||
        r.summary.toLowerCase().includes(q) ||
        r.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    return results;
  }

  getBookmarks(userId) {
    const db = this.read();
    const userBm = db.bookmarks.filter(b => b.userId === userId);
    const bookmarkedIds = new Set(userBm.map(b => b.resourceId));
    return db.resources.filter(r => bookmarkedIds.has(r.id));
  }

  toggleBookmark(userId, resourceId) {
    const db = this.read();
    const existingIndex = db.bookmarks.findIndex(b => b.userId === userId && b.resourceId === resourceId);

    if (existingIndex > -1) {
      db.bookmarks.splice(existingIndex, 1);
      this.write(db);
      return { bookmarked: false };
    } else {
      db.bookmarks.push({
        id: `bm_${crypto.randomUUID()}`,
        userId,
        resourceId,
        createdAt: new Date().toISOString()
      });
      this.write(db);
      return { bookmarked: true };
    }
  }

  // --- Family Support Circle ---
  getSupportCircle(userId) {
    const db = this.read();
    return db.supportCircle.filter(c => c.userId === userId);
  }

  addSupportContact(userId, { name, relation, phone, email, avatar }) {
    const db = this.read();
    const newContact = {
      id: `sc_${crypto.randomUUID()}`,
      userId,
      name,
      relation,
      phone: phone || '',
      email: email || '',
      avatar: avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
      createdAt: new Date().toISOString()
    };
    db.supportCircle.push(newContact);
    this.write(db);
    return newContact;
  }

  deleteSupportContact(userId, id) {
    const db = this.read();
    const initialLen = db.supportCircle.length;
    db.supportCircle = db.supportCircle.filter(c => !(c.id === id && c.userId === userId));
    this.write(db);
    return db.supportCircle.length < initialLen;
  }

  recordSupportRequest(userId, contactId, note) {
    const db = this.read();
    const contact = db.supportCircle.find(c => c.id === contactId && c.userId === userId);
    const request = {
      id: `req_${crypto.randomUUID()}`,
      userId,
      contactId,
      contactName: contact ? contact.name : 'Unknown',
      note: note || 'A gentle request for checking in.',
      dispatchedAt: new Date().toISOString()
    };
    db.supportRequests.push(request);
    this.write(db);
    return request;
  }

  // --- MindMate Chat ---
  getChatHistory(userId) {
    const db = this.read();
    return db.mindmateChats
      .filter(c => c.userId === userId)
      .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  }

  addChatMessage(userId, sender, message) {
    const db = this.read();
    const chatMsg = {
      id: `chat_${crypto.randomUUID()}`,
      userId,
      sender,
      message,
      timestamp: new Date().toISOString()
    };
    db.mindmateChats.push(chatMsg);
    this.write(db);
    return chatMsg;
  }

  // --- SOS ---
  getSosResources() {
    const db = this.read();
    return db.sosResources;
  }
}

export const db = new Database();
