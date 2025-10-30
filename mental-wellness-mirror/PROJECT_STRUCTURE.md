# 📂 Project Structure Explained

## Root Directory

```
mental-wellness-mirror/
├── 📄 package.json          # Root package with concurrently script
├── 📄 README.md             # Main documentation
├── 📄 QUICKSTART.md         # Quick setup guide
├── 📄 DATABASE.md           # MongoDB setup instructions
├── 📄 setup.sh              # Automated setup script
├── 📄 .gitignore            # Git ignore patterns
├── 📁 server/               # Backend (Node.js + Express)
└── 📁 client/               # Frontend (React + Vite)
```

---

## 🔧 Backend Structure (`server/`)

```
server/
├── 📄 package.json          # Backend dependencies
├── 📄 index.js              # Main Express server
├── 📄 .env                  # Environment variables (create from .env.example)
├── 📄 .env.example          # Template for .env
├── 📄 .gitignore            # Ignore node_modules, .env, uploads
│
├── 📁 models/
│   └── 📄 Entry.js          # MongoDB schema for journal entries
│
├── 📁 controllers/
│   ├── 📄 analyzeController.js   # OpenAI GPT + Whisper logic
│   └── 📄 entryController.js     # CRUD operations for entries
│
├── 📁 routes/
│   ├── 📄 analyzeRoutes.js       # Routes for /api/analyze-*
│   └── 📄 entryRoutes.js         # Routes for /api/entries
│
└── 📁 uploads/              # Temporary audio file storage (auto-created)
```

### Key Backend Files

#### `index.js`

- Creates Express app
- Connects to MongoDB
- Sets up middleware (CORS, JSON parsing)
- Registers routes
- Starts server on port 5000

#### `models/Entry.js`

- Mongoose schema for journal entries
- Fields: userId, entryType, content, transcript, mood, insight, createdAt

#### `controllers/analyzeController.js`

- `analyzeText()`: Sends text to GPT-4 for mood analysis
- `analyzeVoice()`:
  1. Transcribes audio with Whisper
  2. Analyzes transcript with GPT-4
  3. Returns transcript + mood + insight

#### `controllers/entryController.js`

- `createEntry()`: Saves journal entry to database
- `getEntries()`: Fetches all entries (with optional filters)
- `getEntryById()`: Gets single entry
- `deleteEntry()`: Removes entry

#### `routes/analyzeRoutes.js`

- POST `/api/analyze-text` → analyzeText
- POST `/api/analyze-voice` → analyzeVoice (with multer for file upload)

#### `routes/entryRoutes.js`

- POST `/api/entries` → createEntry
- GET `/api/entries` → getEntries
- GET `/api/entries/:id` → getEntryById
- DELETE `/api/entries/:id` → deleteEntry

---

## 🎨 Frontend Structure (`client/`)

```
client/
├── 📄 package.json          # Frontend dependencies
├── 📄 vite.config.js        # Vite configuration (proxy to backend)
├── 📄 tailwind.config.js    # Tailwind CSS theme
├── 📄 postcss.config.js     # PostCSS for Tailwind
├── 📄 index.html            # HTML entry point
├── 📄 .gitignore            # Ignore node_modules, dist
│
└── 📁 src/
    ├── 📄 main.jsx          # React entry point
    ├── 📄 App.jsx           # Main app with router + header
    ├── 📄 index.css         # Global Tailwind styles
    │
    ├── 📁 api/
    │   └── 📄 api.js        # Axios API service layer
    │
    ├── 📁 components/
    │   ├── 📄 JournalInput.jsx   # Main journal component (text + voice)
    │   ├── 📄 VoiceRecorder.jsx  # Audio recording with MediaRecorder
    │   ├── 📄 InsightCard.jsx    # Animated insight display
    │   └── 📄 EmotionChart.jsx   # Chart.js emotion trend visualization
    │
    └── 📁 pages/
        ├── 📄 Dashboard.jsx      # Main dashboard with entries list
        ├── 📄 JournalPage.jsx    # New entry page
        └── 📄 InsightPage.jsx    # Individual entry detail view
```

### Key Frontend Files

#### `App.jsx`

- React Router setup
- Header navigation (Dashboard, New Entry)
- Route definitions:
  - `/` → Dashboard
  - `/journal` → JournalPage
  - `/insight/:id` → InsightPage

#### `api/api.js`

- Axios instance with base URL
- API functions:
  - `analyzeText(text)` → POST /api/analyze-text
  - `analyzeVoice(audioBlob)` → POST /api/analyze-voice
  - `createEntry(data)` → POST /api/entries
  - `getEntries(type, limit)` → GET /api/entries
  - `getEntryById(id)` → GET /api/entries/:id
  - `deleteEntry(id)` → DELETE /api/entries/:id

#### `components/JournalInput.jsx`

- Tab switcher: Text vs Voice
- Text mode:
  - Textarea for journal entry
  - Calls `analyzeText()` on submit
- Voice mode:
  - Embeds VoiceRecorder component
  - Calls `analyzeVoice()` on submit
- Displays InsightCard with results
- Saves entry to database

#### `components/VoiceRecorder.jsx`

- Uses browser MediaRecorder API
- Records audio from microphone
- Shows recording timer
- Returns audio Blob to parent
- Audio playback preview

#### `components/InsightCard.jsx`

- Animated card with Framer Motion
- Shows emoji based on mood
- Displays mood + insight text
- Beautiful gradient background

#### `components/EmotionChart.jsx`

- Chart.js Line chart
- Maps moods to numerical values (0-5)
- Shows emotional trend over time
- Interactive tooltips

#### `pages/Dashboard.jsx`

- Displays stats (total, text, voice counts)
- Shows EmotionChart
- Lists all journal entries
- Filter by type (all/text/voice)
- Delete entries
- Link to create new entry

#### `pages/JournalPage.jsx`

- Simple wrapper for JournalInput
- Centered layout with title

#### `pages/InsightPage.jsx`

- Individual entry detail view
- Shows full insight card
- Displays full entry content/transcript
- Back to dashboard link

---

## 🔄 Data Flow

### Text Entry Flow:

```
User writes text
  ↓
JournalInput → analyzeText(text)
  ↓
Backend: GPT-4 analyzes → {mood, insight}
  ↓
Frontend: Display InsightCard
  ↓
Save to MongoDB via createEntry()
  ↓
Redirect to Dashboard
```

### Voice Entry Flow:

```
User records voice
  ↓
VoiceRecorder → MediaRecorder API → audioBlob
  ↓
JournalInput → analyzeVoice(audioBlob)
  ↓
Backend: Whisper transcribes → transcript
  ↓
Backend: GPT-4 analyzes → {mood, insight}
  ↓
Frontend: Display InsightCard
  ↓
Save to MongoDB via createEntry()
  ↓
Redirect to Dashboard
```

### Dashboard Flow:

```
Page loads
  ↓
Fetch entries via getEntries()
  ↓
Display EmotionChart (Chart.js)
  ↓
List entries with filter
  ↓
User can delete entry → deleteEntry(id)
```

---

## 🔑 Environment Variables

### `server/.env`

```env
OPENAI_API_KEY=sk-...          # OpenAI API key (required)
MONGODB_URI=mongodb://...      # MongoDB connection string (required)
PORT=5000                      # Server port (optional, default: 5000)
```

---

## 📦 Key Dependencies

### Backend

- `express` - Web framework
- `mongoose` - MongoDB ODM
- `openai` - OpenAI API client
- `multer` - File upload handling
- `cors` - Cross-origin requests
- `dotenv` - Environment variables

### Frontend

- `react` - UI library
- `react-router-dom` - Routing
- `axios` - HTTP client
- `chart.js` + `react-chartjs-2` - Charts
- `framer-motion` - Animations
- `tailwindcss` - Styling

### Root

- `concurrently` - Run both servers simultaneously

---

## 🚀 NPM Scripts

### Root (`package.json`)

```json
"install-all": "cd server && npm install && cd ../client && npm install"
"dev": "concurrently \"cd server && npm run dev\" \"cd client && npm run dev\""
"build": "cd client && npm run build"
"start": "cd server && npm start"
```

### Server (`server/package.json`)

```json
"start": "node index.js"          # Production
"dev": "nodemon index.js"         # Development (auto-restart)
```

### Client (`client/package.json`)

```json
"dev": "vite"                     # Development server
"build": "vite build"             # Production build
"preview": "vite preview"         # Preview production build
```

---

## 🎯 API Endpoints Summary

| Method | Endpoint             | Description             |
| ------ | -------------------- | ----------------------- |
| POST   | `/api/analyze-text`  | Analyze text entry      |
| POST   | `/api/analyze-voice` | Analyze voice recording |
| POST   | `/api/entries`       | Create journal entry    |
| GET    | `/api/entries`       | Get all entries         |
| GET    | `/api/entries/:id`   | Get single entry        |
| DELETE | `/api/entries/:id`   | Delete entry            |
| GET    | `/api/health`        | Health check            |

---

## 🎨 UI Component Hierarchy

```
App
├── Header (nav)
│
└── Routes
    ├── Dashboard
    │   ├── EmotionChart
    │   └── Entry Cards (list)
    │
    ├── JournalPage
    │   └── JournalInput
    │       ├── VoiceRecorder (if voice mode)
    │       └── InsightCard (after analysis)
    │
    └── InsightPage
        └── InsightCard
```

---

This structure allows easy modification and extension. Each file has a single responsibility, making debugging and feature additions straightforward!
