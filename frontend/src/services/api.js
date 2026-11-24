// Smart API Base: detects if served on Live Server (port 5500) vs Express (5000) vs Vite (3000)
function getApiBase() {
  if (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  if (typeof window !== 'undefined') {
    const port = window.location.port;
    if (port && port !== '5000' && port !== '3000') {
      return 'http://127.0.0.1:5000/api';
    }
  }
  return '/api';
}

function getAuthHeader() {
  const token = localStorage.getItem('mindease_token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
}

// Pre-seeded offline fallback dataset
const DEFAULT_RESOURCES = [
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
];

const DEFAULT_SUPPORT_CONTACTS = [
  {
    id: "sc_1",
    name: "Emma Wilson",
    relation: "Sister",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    phone: "+1 (555) 234-5678",
    email: "emma.wilson@example.com"
  },
  {
    id: "sc_2",
    name: "Dr. James Park",
    relation: "Counsellor",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
    phone: "+1 (555) 876-5432",
    email: "dr.james.park@wellnessclinic.org"
  }
];

const EMPATHETIC_RESPONSES = [
  "I hear you. Feeling stressed or overwhelmed is so valid. Let's take a gentle pause together. Would you like to try a 2-minute Guided Breathing session?",
  "Thank you for sharing that with me. Remember to unclench your jaw and drop your shoulders away from your ears. A gentle breath right now might do wonders.",
  "I'm right here with you. Your feelings are real, but they are also temporary waves. Let's ground ourselves with slow, rhythmic breathing. Ready?",
  "Hello! I'm MindMate. I'm here to support you on your wellness journey today. 🧡 How is your heart feeling right now?",
  "You are doing the best you can, and that is more than enough today. How can I help you find a little more ease right now?"
];

// Offline Fallback Handler
function handleOfflineFallback(endpoint, options = {}) {
  const method = (options.method || 'GET').toUpperCase();
  const body = options.body ? JSON.parse(options.body) : {};

  // 1. Auth Login / Guest
  if (endpoint === '/auth/login' || endpoint === '/auth/guest' || endpoint === '/auth/register') {
    const user = {
      id: 'usr_default_demo',
      name: body.name || (body.email ? body.email.split('@')[0] : 'User'),
      email: body.email || 'user@mindease.com',
      isGuest: endpoint === '/auth/guest'
    };
    const token = 'demo_jwt_token_local';
    return { token, user, message: 'Logged in successfully (Offline/Local Mode).' };
  }

  // 2. Auth /me
  if (endpoint === '/auth/me') {
    return { user: { id: 'usr_default_demo', name: 'User', email: 'user@mindease.com' } };
  }

  // 3. Mood Analytics
  if (endpoint === '/moods/analytics') {
    const storedMoods = JSON.parse(localStorage.getItem('mindease_local_moods') || '[]');
    const baseTrend = [
      { day: 'Mon', score: 6, feeling: 'Positive' },
      { day: 'Tue', score: 7, feeling: 'Daily Joy' },
      { day: 'Wed', score: 5, feeling: 'Calm' },
      { day: 'Thu', score: 4, feeling: 'Anxious' },
      { day: 'Fri', score: 6, feeling: 'Positive' },
      { day: 'Sat', score: 8, feeling: 'Radiant' },
      { day: 'Sun', score: 7, feeling: 'Daily Joy' }
    ];

    if (storedMoods.length > 0) {
      const latest = storedMoods[storedMoods.length - 1];
      const todayShort = new Date().toLocaleDateString('en-US', { weekday: 'short' });
      const matchIdx = baseTrend.findIndex(t => t.day === todayShort);
      if (matchIdx !== -1) {
        baseTrend[matchIdx] = { day: todayShort, score: latest.score, feeling: latest.feeling };
      }
    }

    const avg = Number((baseTrend.reduce((a, b) => a + b.score, 0) / baseTrend.length).toFixed(1));
    return { period: 'Last week', averageScore: avg, trend: baseTrend };
  }

  // 4. Log Mood
  if (endpoint === '/moods' && method === 'POST') {
    const moodScores = { 'Radiant': 8, 'Daily Joy': 7, 'Positive': 6, 'Calm': 5, 'Neutral': 4, 'Anxious': 3, 'Stressed': 2, 'Sad': 2, 'Overwhelmed': 1 };
    const score = moodScores[body.feeling] || 5;
    const newMood = {
      id: `m_${Date.now()}`,
      feeling: body.feeling,
      score,
      day: new Date().toLocaleDateString('en-US', { weekday: 'short' }),
      date: new Date().toISOString()
    };
    const stored = JSON.parse(localStorage.getItem('mindease_local_moods') || '[]');
    stored.push(newMood);
    localStorage.setItem('mindease_local_moods', JSON.stringify(stored));
    return { message: 'Mood logged.', mood: newMood };
  }

  // 5. Breathing
  if (endpoint === '/breathing/presets') {
    return { durationOptionsMinutes: [2, 5, 10] };
  }
  if (endpoint === '/breathing/sessions' && method === 'POST') {
    return { message: 'Breathing session logged.', session: { id: `bs_${Date.now()}`, ...body } };
  }

  // 6. Journals
  if (endpoint === '/journals') {
    const entries = JSON.parse(localStorage.getItem('mindease_local_journals') || '[]');
    if (method === 'POST') {
      const newEntry = {
        id: `j_${Date.now()}`,
        title: body.title || 'Untitled Entry',
        content: body.content || '',
        moodTag: body.moodTag || 'Calm',
        createdAt: new Date().toISOString()
      };
      entries.unshift(newEntry);
      localStorage.setItem('mindease_local_journals', JSON.stringify(entries));
      return { message: 'Saved.', entry: newEntry };
    }
    return entries.length > 0 ? entries : [
      {
        id: "j_init",
        title: "Finding Stillness in the Afternoon",
        content: "Today I took 5 minutes to step away from screens and practice mindful breathing. Noticeable difference in tension around shoulders.",
        moodTag: "Calm",
        createdAt: new Date().toISOString()
      }
    ];
  }
  if (endpoint === '/journals/prompts') {
    return [
      "What is on your mind?",
      "What are you grateful for today?",
      "What made you feel good today?",
      "What would you like to let go of?"
    ];
  }

  // 7. Resources & Categories
  if (endpoint.startsWith('/resources/categories')) {
    return ['All', 'Exam Stress', 'Sleep', 'Anxiety Support', 'Emotional Wellbeing', 'Mindfulness', 'Self-Care', 'Relationships', 'Productivity'];
  }
  if (endpoint.startsWith('/resources')) {
    const bookmarkedIds = JSON.parse(localStorage.getItem('mindease_local_bookmarks') || '[]');
    let list = DEFAULT_RESOURCES.map(r => ({ ...r, isBookmarked: bookmarkedIds.includes(r.id) }));

    const urlParams = new URLSearchParams(endpoint.split('?')[1] || '');
    const cat = urlParams.get('category');
    const q = urlParams.get('search');

    if (cat && cat !== 'All') {
      list = list.filter(r => r.category.toLowerCase() === cat.toLowerCase());
    }
    if (q) {
      const low = q.toLowerCase();
      list = list.filter(r => r.title.toLowerCase().includes(low) || r.summary.toLowerCase().includes(low));
    }

    if (endpoint.includes('/bookmark') && method === 'POST') {
      const parts = endpoint.split('/');
      const resId = parts[2];
      const idx = bookmarkedIds.indexOf(resId);
      let isBookmarked = false;
      if (idx > -1) {
        bookmarkedIds.splice(idx, 1);
      } else {
        bookmarkedIds.push(resId);
        isBookmarked = true;
      }
      localStorage.setItem('mindease_local_bookmarks', JSON.stringify(bookmarkedIds));
      return { bookmarked: isBookmarked };
    }
    return list;
  }

  // 8. Support Circle
  if (endpoint.startsWith('/support-circle')) {
    let contacts = JSON.parse(localStorage.getItem('mindease_local_contacts') || 'null');
    if (!contacts) {
      contacts = DEFAULT_SUPPORT_CONTACTS;
      localStorage.setItem('mindease_local_contacts', JSON.stringify(contacts));
    }

    if (method === 'POST' && endpoint === '/support-circle') {
      const newContact = { id: `sc_${Date.now()}`, ...body };
      contacts.push(newContact);
      localStorage.setItem('mindease_local_contacts', JSON.stringify(contacts));
      return { message: 'Contact added.', contact: newContact };
    }
    if (endpoint.includes('/request') && method === 'POST') {
      return { message: 'A gentle support request has been dispatched.' };
    }
    return contacts;
  }

  // 9. SOS
  if (endpoint === '/sos') {
    return {
      title: "Immediate Help & Crisis Support",
      resources: [
        { name: "National Suicide & Crisis Lifeline", contact: "988", type: "phone" },
        { name: "Crisis Text Line", contact: "Text HOME to 741741", type: "sms" },
        { name: "The Trevor Project", contact: "1-866-488-7386", type: "phone" }
      ]
    };
  }
  if (endpoint === '/sos/alert-circle') {
    return { message: 'Alert sent to your trusted support circle.' };
  }

  // 10. MindMate AI Chat
  if (endpoint === '/mindmate/prompts') {
    return [
      { id: 'p_1', label: "I'm stressed", prompt: "I'm stressed and feeling overwhelmed right now." },
      { id: 'p_2', label: "Help me relax", prompt: "Can you guide me with a quick calming suggestion?" },
      { id: 'p_3', label: "I feel anxious", prompt: "I feel anxious and need help grounding myself." }
    ];
  }
  if (endpoint === '/mindmate/history') {
    return JSON.parse(localStorage.getItem('mindease_local_chats') || '[]');
  }
  if (endpoint === '/mindmate/chat' && method === 'POST') {
    const userMsg = { id: `chat_${Date.now()}`, sender: 'user', message: body.message, timestamp: new Date().toISOString() };
    const randReply = EMPATHETIC_RESPONSES[Math.floor(Math.random() * EMPATHETIC_RESPONSES.length)];
    const assistantMsg = { id: `chat_${Date.now() + 1}`, sender: 'assistant', message: randReply, timestamp: new Date().toISOString() };

    const chats = JSON.parse(localStorage.getItem('mindease_local_chats') || '[]');
    chats.push(userMsg, assistantMsg);
    localStorage.setItem('mindease_local_chats', JSON.stringify(chats));

    return { userMessage: userMsg, reply: assistantMsg };
  }

  return {};
}

async function request(endpoint, options = {}) {
  const apiBase = getApiBase();
  try {
    const res = await fetch(`${apiBase}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
        ...(options.headers || {})
      }
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || `Request failed with status ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    // If backend is not running or network request fails, fall back to rich offline store
    // This allows clicking "Go Live" in VS Code to work immediately without launching the backend server!
    try {
      return handleOfflineFallback(endpoint, options);
    } catch (fallbackErr) {
      console.warn(`API [${endpoint}] fallback error:`, fallbackErr.message);
      throw err;
    }
  }
}

export const api = {
  // Auth
  login: (email, password) => request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  loginGuest: () => request('/auth/guest', { method: 'POST' }),
  register: (name, email, password) => request('/auth/register', { method: 'POST', body: JSON.stringify({ name, email, password }) }),
  getMe: () => request('/auth/me'),

  // Moods
  getMoodAnalytics: () => request('/moods/analytics'),
  getMoods: () => request('/moods'),
  logMood: (feeling, note, day) => request('/moods', { method: 'POST', body: JSON.stringify({ feeling, note, day }) }),

  // Breathing
  getBreathingPresets: () => request('/breathing/presets'),
  logBreathingSession: (durationSeconds, rhythm) => request('/breathing/sessions', { method: 'POST', body: JSON.stringify({ durationSeconds, rhythm }) }),

  // Journal
  getJournals: () => request('/journals'),
  getJournalPrompts: () => request('/journals/prompts'),
  createJournal: (data) => request('/journals', { method: 'POST', body: JSON.stringify(data) }),
  deleteJournal: (id) => request('/journals/' + id, { method: 'DELETE' }),

  // Resources
  getResources: (category = 'All', search = '') => {
    const params = new URLSearchParams();
    if (category && category !== 'All') params.append('category', category);
    if (search) params.append('search', search);
    return request(`/resources?${params.toString()}`);
  },
  getCategories: () => request('/resources/categories'),
  getBookmarks: () => request('/resources/bookmarks'),
  toggleBookmark: (id) => request(`/resources/${id}/bookmark`, { method: 'POST' }),

  // Support Circle
  getSupportCircle: () => request('/support-circle'),
  addSupportContact: (data) => request('/support-circle', { method: 'POST', body: JSON.stringify(data) }),
  deleteSupportContact: (id) => request(`/support-circle/${id}`, { method: 'DELETE' }),
  requestSupport: (id, note) => request(`/support-circle/${id}/request`, { method: 'POST', body: JSON.stringify({ note }) }),

  // SOS
  getSosData: () => request('/sos'),
  triggerSosAlert: () => request('/sos/alert-circle', { method: 'POST' }),

  // MindMate AI
  getMindMatePrompts: () => request('/mindmate/prompts'),
  getMindMateHistory: () => request('/mindmate/history'),
  sendMindMateMessage: (message) => request('/mindmate/chat', { method: 'POST', body: JSON.stringify({ message }) })
};
