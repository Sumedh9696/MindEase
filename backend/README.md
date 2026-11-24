# MindEase Backend API

Complete Node.js / Express REST API for the **MindEase** Mental Wellness Platform.

---

## 🚀 Quick Start

```bash
cd backend
npm install
npm test       # Run automated test suite verifying all 9 core routes
npm run dev    # Start dev server with file watching on port 5000
npm start      # Start production server
```

Server URL: `http://localhost:5000`  
Health check: `http://localhost:5000/api/health`

---

## 📁 Architecture & File Structure

```
backend/
├── src/
│   ├── config/
│   │   └── index.js              # Environment configs & defaults
│   ├── db/
│   │   ├── database.js           # Atomic JSON persistence engine
│   │   └── data.json             # Seeded store (users, moods, resources, contacts)
│   ├── middleware/
│   │   └── auth.js               # JWT verification & demo user fallback
│   ├── routes/
│   │   ├── authRoutes.js         # Register, login, guest session, /me
│   │   ├── moodRoutes.js         # Mood tracking & weekly analytics for graph
│   │   ├── breathingRoutes.js    # Breathing session logging & presets
│   │   ├── journalRoutes.js      # CRUD journal entries & reflective prompts
│   │   ├── resourceRoutes.js     # Curated articles, categories & bookmarks
│   │   ├── supportCircleRoutes.js# Trusted emergency contacts & support requests
│   │   ├── sosRoutes.js          # Crisis hotlines & emergency alert dispatch
│   │   └── mindmateRoutes.js     # Empathetic AI companion chat & prompts
│   ├── services/
│   │   └── mindmateService.js    # Empathetic AI engine + Gemini API integration
│   └── server.js                 # Express server bootstrap & route mounting
├── test.js                       # Native integration test suite
├── .env.example
├── .env
└── package.json
```

---

## 📡 API Endpoints Overview

### 1. Authentication (`/api/auth`)
* `POST /api/auth/register` - Create account (`{ name, email, password }`)
* `POST /api/auth/login` - Authenticate existing user
* `POST /api/auth/guest` - Instant guest session (one-click entry)
* `GET /api/auth/me` - Current session details

### 2. Mood Tracking & Analytics (`/api/moods`)
* `GET /api/moods/analytics` - Returns Mon–Sun scores, average, and mood trends for the graph
* `GET /api/moods` - List user's mood logs
* `POST /api/moods` - Log mood (`{ feeling: "Radiant" | "Daily Joy" | "Positive" | "Anxious" | "Stressed" | "Calm" | "Neutral" | "Sad" | "Overwhelmed", note: "..." }`)

### 3. Guided Breathing (`/api/breathing`)
* `GET /api/breathing/presets` - Box breathing, 4-7-8, and coherent breathing patterns
* `POST /api/breathing/sessions` - Log completed session duration (`{ durationSeconds, rhythm }`)

### 4. Daily Journal (`/api/journals`)
* `GET /api/journals` - Get all entries
* `GET /api/journals/prompts` - Get daily reflection prompt suggestions
* `POST /api/journals` - Save entry (`{ title, content, moodTag, promptsAnswered }`)
* `GET /api/journals/:id` - Fetch single entry
* `PUT /api/journals/:id` - Update entry
* `DELETE /api/journals/:id` - Remove entry

### 5. Wellness Resources (`/api/resources`)
* `GET /api/resources` - List articles (supports `?category=Exam%20Stress` and `?search=anxiety`)
* `GET /api/resources/categories` - Returns all 9 category pills
* `GET /api/resources/bookmarks` - User saved articles
* `POST /api/resources/:id/bookmark` - Toggle bookmark status

### 6. Family Support Circle (`/api/support-circle`)
* `GET /api/support-circle` - List trusted contacts (e.g., Emma Wilson, Dr. James Park)
* `POST /api/support-circle` - Add trusted contact (`{ name, relation, phone, email }`)
* `DELETE /api/support-circle/:id` - Remove contact
* `POST /api/support-circle/:id/request` - Send discreet, gentle check-in request

### 7. MindMate AI Companion (`/api/mindmate`)
* `GET /api/mindmate/prompts` - Quick suggestion chips (`"I'm stressed"`, `"Help me relax"`, `"I feel anxious"`)
* `GET /api/mindmate/history` - Chat conversation logs
* `POST /api/mindmate/chat` - Send message, receive empathetic response (`{ message }`)

### 8. SOS Emergency Support (`/api/sos`)
* `GET /api/sos` - Crisis lifelines (988, 741741, Trevor Project) & instant calming box breathing instructions
* `POST /api/sos/alert-circle` - Broadcast emergency alert to user's trusted circle
