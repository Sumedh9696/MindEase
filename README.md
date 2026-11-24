# 🌸 MindEase — Mental Wellness & Self-Care Platform

> A calming, modern mental wellness web application designed to support daily emotional reflection, guided mindfulness, empathetic companion conversations, and emergency support circles.

Built to faithfully replicate the design and interactions shown in the Figma prototype and screen walkthrough.

---

## ⚡ Instant Setup: Open in VS Code & "Go Live"

You can open and preview the entire website immediately using the **VS Code Live Server extension**:

1. **Open this folder in VS Code**:
   * Open VS Code, click **File → Open Folder...** and select:
     `C:\Users\sumed\Downloads\mindease`
2. **Press "Go Live"**:
   * Click the **"Go Live"** button in the bottom-right status bar of VS Code, or right-click [`index.html`](file:///c:/Users/sumed/Downloads/mindease/index.html) and choose **"Open with Live Server"**.
3. **Instantly View & Test**:
   * Your browser will automatically open `http://127.0.0.1:5500/` showing the complete **MindEase** website!
   * **Smart Dual-Mode**: All features (authentication, guest mode, mood logging with confetti, weekly trend graph, breathing animations, daily journal editor with prompts, article reader, support circle requests, and MindMate AI companion) are pre-configured to work **instantly out-of-the-box** even before you run any terminal commands.
   * If you also run `npm start` in the terminal, the app automatically connects to the live Express server & persistent database!

---

## ✨ Features Overview

### 1. 🔐 Authentication & Guest Mode
* **Lotus Branded Login Screen**: Warm soothing background with centered card, email and password inputs, and "Forgot Password?" trigger.
* **Instant Guest Access**: One-click *"Continue as Guest"* button allowing immediate exploration without requiring registration.

### 2. 🏠 Central Wellness Dashboard
* **"How are you feeling today?"**: Real-time mood check-in selector (Radiant ☀️, Daily Joy 😊, Positive ✨, Anxious 😟, Stressed 😣, plus expandable "More" emotions) with gentle particle feedback.
* **Mood Trend Analytics**: Interactive spline curve graph mapping emotional patterns across the 7 days of the week (Mon–Sun) with hover tooltips and dynamic scoring.
* **Wellness Toolkit Sidebar**: Fast navigation to Guided Breathing, Daily Journal, Positive Affirmations, and Calming Mini-Games.
* **Resource & Support Teasers**: Quick access cards for "Managing Exam Stress" and "Family Support Circle".

### 3. 🤖 MindMate AI Companion
* **Empathetic Conversational Assistant**: Docked right-panel companion offering non-judgmental, soothing guidance.
* **Quick-Prompt Chips**: One-tap conversation starters (`"I'm stressed"`, `"Help me relax"`, `"I feel anxious"`).
* **Gemini API Integration**: Supports live Gemini API generation when a key is provided in `.env`, paired with a built-in compassionate therapeutic rule engine.

### 4. 🫁 Guided Breathing Engine
* **Interactive Pulsating Circle**: Visual rhythm guide that expands on inhale, holds, contracts on exhale, and rests (Box Breathing 4-4-4-2).
* **Customizable Session Durations**: Select between 2 min, 5 min, or 10 min sessions with timer countdown, audio/visual cues, and celebration upon completion.

### 5. 🗂️ Wellness Tools Hub ("What would help you right now?")
* 10 interactive activity cards featuring **hover-reveal micro-interactions**:
  1. *Guided Breathing* (2–10 min)
  2. *Daily Journal* (5–15 min)
  3. *Positive Affirmations* (2 min)
  4. *Calming Mini-Games* (5–10 min)
  5. *Meditation* (5–20 min)
  6. *Sleep & Relaxation* (10–30 min)
  7. *Wellness Resources* (Browse)
  8. *MindMate AI* (Anytime)
  9. *Family Support* (Anytime)
  10. *Stress Relief* (5 min)

### 6. 📓 Daily Journal & Prompt Helper
* **Live Timestamping**: Automatically captures current day, date, and time.
* **Emotional State Tagging**: Tag journal entries with your current feeling.
* **Reflective Prompts**: Clickable prompts (*"What is on your mind?"*, *"What are you grateful for today?"*, *"What made you feel good today?"*, *"What would you like to let go of?"*) that insert directly into the writing area.
* **Persistent History**: View past journal reflections saved to the database.

### 7. 📚 Wellness Resources Hub
* **Curated Article Catalog**: Evidence-based guides on Exam Stress, Sleep Hygiene 101, Understanding Anxiety, The Power of Journaling, and more.
* **Instant Category Filters**: 9 filter pills (`All`, `Exam Stress`, `Sleep`, `Anxiety Support`, `Emotional Wellbeing`, `Mindfulness`, `Self-Care`, `Relationships`, `Productivity`).
* **Instant Search & Bookmarking**: Search bar with real-time results and bookmark toggling.
* **Serene Reader Modal**: Clean reading interface with estimated read times and author credits.

### 8. 🤝 Family Support Circle
* **Trusted Emergency Contacts**: Pre-seeded with trusted connections (e.g., Emma Wilson - Sister, Dr. James Park - Counsellor).
* **Discreet Check-in Requests**: Send a gentle support notification with one click.
* **Add Trusted Person**: Add new trusted friends, family, or counselors.
* **Privacy Guarantee**: Explicit assurance that personal thoughts and sensitive data are never transmitted.

### 9. 🚨 SOS Emergency Support Modal
* Accessible anytime via the high-visibility **`+ SOS Help`** button in the top navbar.
* Direct access to 24/7 confidential crisis lifelines (988 Suicide & Crisis Lifeline, Crisis Text Line 741741, The Trevor Project).
* One-click emergency broadcast to your support circle.
* Emergency Box Breathing grounding technique.

### 10. 🎮 Calming Mini-Games & Positive Affirmations
* **Zen Bubble Wrap**: Tactile bubble popping game with satisfying feedback.
* **Affirmations Deck**: Flippable mindfulness affirmation cards with inspirational themes.

---

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, Vite, Tailwind CSS, Lucide Icons, Canvas-Confetti |
| **Backend** | Node.js, Express, CORS, JSON Atomic Persistence, JWT Auth |
| **AI Integration** | MindMate Empathetic Engine + Optional Google Gemini API |
| **Styling** | Calming earth & pastel palette (`#FAF4EB`, `#E77A57`, `#86C59C`, `#7BB6D8`) |

---

## 🚀 Alternative Startup Methods

### 1. Run the Fullstack App (Single Server)
The backend automatically serves both the API and the complete frontend UI:

```bash
# Start backend on http://localhost:5000 (serves both API & Frontend UI)
npm start
```
Open **[http://localhost:5000](http://localhost:5000)** in your browser!

### 2. Run in Development Mode (Independent Hot-Reload)

```bash
# Runs both backend (port 5000) and frontend with Vite HMR (port 3000)
npm run dev
```

### 3. Run Backend Automated Test Suite
Verify all 9 core backend endpoints in-memory:

```bash
npm test
```

---

## 📁 Repository Structure

```
mindease/
├── index.html                        # Root entry point for VS Code Live Server ("Go Live")
├── assets/                           # Production stylesheets & JS bundles
├── backend/
│   ├── src/
│   │   ├── config/index.js           # Configuration & environment variables
│   │   ├── db/
│   │   │   ├── database.js           # Atomic JSON persistence database engine
│   │   │   └── data.json             # Seed data (users, moods, resources, contacts)
│   │   ├── middleware/auth.js        # Auth & guest fallback middleware
│   │   ├── routes/
│   │   │   ├── authRoutes.js         # Register, Login, Guest session
│   │   │   ├── moodRoutes.js         # Mood tracking & weekly analytics curve
│   │   │   ├── breathingRoutes.js    # Breathing session logs & presets
│   │   │   ├── journalRoutes.js      # Journal CRUD & reflection prompts
│   │   │   ├── resourceRoutes.js     # Curated articles & bookmarking
│   │   │   ├── supportCircleRoutes.js# Trusted emergency contacts & support alerts
│   │   │   ├── sosRoutes.js          # Crisis hotlines & circle alerts
│   │   │   └── mindmateRoutes.js     # MindMate AI chat & prompt chips
│   │   ├── services/mindmateService.js # AI response engine (+ Gemini API)
│   │   └── server.js                 # Express server & static frontend serving
│   ├── test.js                       # Comprehensive backend test suite
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── LotusLogo.jsx     # Signature MindEase pink lotus blossom SVG
│   │   │   │   ├── Navbar.jsx        # Navigation header with search & SOS button
│   │   │   │   ├── SosModal.jsx      # Emergency 24/7 crisis hotlines modal
│   │   │   │   └── MindMateCompanion.jsx # Floating AI chatbot widget
│   │   │   └── dashboard/
│   │   │       ├── ToolkitSidebar.jsx# Left navigation & user profile snippet
│   │   │       ├── MoodSelector.jsx  # Mood selector buttons with confetti
│   │   │       ├── MoodAnalytics.jsx # Smooth spline curve emotion graph
│   │   │       └── WellnessTeasers.jsx # Exam stress & support circle cards
│   │   ├── views/
│   │   │   ├── LoginView.jsx         # Sign-in & guest entry screen
│   │   │   ├── DashboardView.jsx     # Main wellness dashboard
│   │   │   ├── BreathingView.jsx     # Guided breathing circle rhythm engine
│   │   │   ├── WellnessToolsView.jsx # 10 interactive cards with hover reveal
│   │   │   ├── DailyJournalView.jsx  # Rich journal editor with prompt helpers
│   │   │   ├── ResourcesView.jsx     # Searchable article library & reader
│   │   │   ├── SupportCircleView.jsx # Family support network & contact manager
│   │   │   ├── AffirmationsView.jsx  # Positive affirmations flippable deck
│   │   │   └── MiniGamesView.jsx     # Calming bubble wrap relaxation game
│   │   ├── context/AuthContext.jsx   # Authentication context & session state
│   │   ├── services/api.js           # Complete frontend API client
│   │   ├── App.jsx                   # Main application router
│   │   └── index.css                 # Tailwind directives & soothing styles
│   ├── dist/                         # Production build
│   └── package.json
├── README.md                         # Project documentation
├── run-dev.js                        # Dev concurrent runner
└── package.json                      # Root workspace scripts
```
