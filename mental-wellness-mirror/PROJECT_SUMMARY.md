# 🎨 Mental Wellness Mirror - Project Summary

## 🌟 What We Built

**Mental Wellness Mirror** is a full-stack web application that uses AI to help users reflect on their emotional well-being through journaling.

---

## ✨ Key Features

### 1. 📝 Text Journaling

- Write journal entries in a beautiful, calming interface
- AI analyzes emotional tone using GPT-4
- Receive personalized, empathetic insights

### 2. 🎤 Voice Journaling

- Record voice notes directly in browser (MediaRecorder API)
- Automatic transcription via OpenAI Whisper
- Same intelligent emotional analysis as text

### 3. 🧠 AI-Powered Insights

- GPT-4 identifies mood (happy, stressed, calm, anxious, etc.)
- Provides warm, humanlike reflections
- Actionable suggestions for well-being

### 4. 📊 Emotion Tracking

- Interactive Chart.js visualization
- Track emotional trends over time
- See patterns in your wellness journey

### 5. 🎨 Beautiful UI

- Soft pastel gradients (purple, pink, blue)
- Smooth Framer Motion animations
- Responsive design (desktop & mobile)
- Calming, therapeutic aesthetic

---

## 🛠️ Technology Stack

### Frontend

```
React 18          → UI Library
Vite              → Build tool & dev server
Tailwind CSS      → Styling framework
React Router      → Client-side routing
Axios             → HTTP client
Chart.js          → Data visualization
Framer Motion     → Animations
MediaRecorder API → Voice capture
```

### Backend

```
Node.js           → Runtime
Express           → Web framework
MongoDB           → Database (NoSQL)
Mongoose          → MongoDB ODM
OpenAI API        → GPT-4 & Whisper
Multer            → File upload handling
CORS              → Cross-origin requests
dotenv            → Environment variables
```

### Infrastructure

```
Concurrently      → Run both servers
Nodemon           → Auto-restart on changes
```

---

## 📐 Architecture

```
┌─────────────────────────────────────────────────────────┐
│                        FRONTEND                         │
│              React + Vite (Port 3000)                   │
│                                                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐            │
│  │Dashboard │  │ Journal  │  │ Insight  │            │
│  │  Page    │  │  Page    │  │  Page    │            │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘            │
│       │             │              │                   │
│  ┌────▼──────────────▼──────────────▼─────┐           │
│  │          API Service Layer              │           │
│  │              (Axios)                    │           │
│  └────────────────┬────────────────────────┘           │
└───────────────────┼────────────────────────────────────┘
                    │ HTTP Requests
                    │ (REST API)
┌───────────────────▼────────────────────────────────────┐
│                      BACKEND                           │
│            Express + Node (Port 5000)                  │
│                                                        │
│  ┌─────────────────────────────────────────┐          │
│  │          Routes & Controllers            │          │
│  │  • /api/analyze-text                    │          │
│  │  • /api/analyze-voice                   │          │
│  │  • /api/entries (CRUD)                  │          │
│  └──────┬──────────────────────┬───────────┘          │
│         │                      │                       │
│    ┌────▼─────┐         ┌──────▼──────┐              │
│    │ OpenAI   │         │  MongoDB    │              │
│    │GPT + Wsp │         │  Database   │              │
│    └──────────┘         └─────────────┘              │
└────────────────────────────────────────────────────────┘
```

---

## 🔄 Data Flow

### Text Entry:

```
User writes text
    ↓
Frontend sends to /api/analyze-text
    ↓
Backend sends text to GPT-4
    ↓
GPT-4 returns {mood, insight}
    ↓
Backend returns to Frontend
    ↓
Frontend displays InsightCard
    ↓
Frontend saves to /api/entries
    ↓
Entry stored in MongoDB
```

### Voice Entry:

```
User records voice (MediaRecorder)
    ↓
Frontend sends audio to /api/analyze-voice
    ↓
Backend sends audio to Whisper → transcript
    ↓
Backend sends transcript to GPT-4 → analysis
    ↓
Backend returns {transcript, mood, insight}
    ↓
Frontend displays transcript + InsightCard
    ↓
Frontend saves to /api/entries
    ↓
Entry stored in MongoDB
```

---

## 📊 Database Schema

### Entry Model

```javascript
{
  _id: ObjectId,              // Auto-generated
  userId: String,             // "default-user" (for demo)
  entryType: "text" | "voice",
  content: String,            // Text entry content
  transcript: String,         // Voice transcript
  mood: String,               // e.g., "happy", "stressed"
  insight: String,            // AI-generated reflection
  createdAt: Date             // Timestamp
}
```

---

## 🎯 API Endpoints

| Method | Endpoint             | Description                  |
| ------ | -------------------- | ---------------------------- |
| POST   | `/api/analyze-text`  | Analyze text journal entry   |
| POST   | `/api/analyze-voice` | Transcribe + analyze voice   |
| POST   | `/api/entries`       | Create new entry             |
| GET    | `/api/entries`       | Get all entries (filterable) |
| GET    | `/api/entries/:id`   | Get single entry             |
| DELETE | `/api/entries/:id`   | Delete entry                 |
| GET    | `/api/health`        | Health check                 |

---

## 📁 File Structure

```
mental-wellness-mirror/
├── 📄 README.md               # Main documentation
├── 📄 QUICKSTART.md           # Setup instructions
├── 📄 DEMO_SCRIPT.md          # Presentation guide
├── 📄 CHECKLIST.md            # Pre-launch checklist
├── 📄 TROUBLESHOOTING.md      # Error solutions
├── 📄 package.json            # Root scripts
│
├── 📁 server/                 # Backend
│   ├── index.js              # Express server
│   ├── models/Entry.js       # Mongoose schema
│   ├── controllers/          # Business logic
│   │   ├── analyzeController.js
│   │   └── entryController.js
│   ├── routes/               # API routes
│   │   ├── analyzeRoutes.js
│   │   └── entryRoutes.js
│   └── .env                  # Environment variables
│
└── 📁 client/                # Frontend
    ├── src/
    │   ├── App.jsx           # Main app + routing
    │   ├── api/api.js        # Axios service
    │   ├── components/       # React components
    │   │   ├── JournalInput.jsx
    │   │   ├── VoiceRecorder.jsx
    │   │   ├── InsightCard.jsx
    │   │   └── EmotionChart.jsx
    │   └── pages/            # Page components
    │       ├── Dashboard.jsx
    │       ├── JournalPage.jsx
    │       └── InsightPage.jsx
    └── tailwind.config.js    # Styling config
```

---

## 🎨 Design Highlights

### Color Palette

```
Primary Purple: #a855f7
Primary Pink:   #ec4899
Primary Blue:   #3b82f6
Background:     Gradient (purple-50 → pink-50 → blue-50)
Cards:          White with 80% opacity, backdrop blur
Shadows:        Soft, multi-layered
```

### Typography

```
Font Family: Inter, system-ui, sans-serif
Headings:    Bold, gradient text
Body:        Regular, gray-700
```

### Animations

```
Page Load:   Fade in + slide up
Buttons:     Scale on hover/tap
Cards:       Stagger entrance
Charts:      Smooth draw-in
Insights:    Sequential reveal
```

---

## 💡 Innovation Points

1. **Dual Input Modes**: Text + Voice in one seamless app
2. **Real-time AI Analysis**: Instant emotional insights
3. **Browser-based Voice**: No app install required
4. **Empathetic AI**: GPT-4 trained for warm, human responses
5. **Trend Visualization**: Chart.js tracks emotional patterns
6. **Responsive Design**: Works everywhere (desktop/tablet/mobile)

---

## 🏆 Hackathon Readiness

### ✅ Fully Functional

- All features work end-to-end
- No breaking bugs
- Tested across browsers

### ✅ Well Documented

- README with setup instructions
- Quick start guide
- Troubleshooting guide
- Demo script
- Code comments

### ✅ Production Quality

- Clean, modular code
- Error handling
- Loading states
- Responsive UI
- Smooth animations

### ✅ Demo Ready

- Pre-create test data
- Practice demo flow
- Backup plans prepared

---

## 📈 Impact & Use Cases

### Who Benefits?

- **Individuals**: Daily journaling for self-reflection
- **Students**: Managing academic stress
- **Professionals**: Work-life balance tracking
- **Mental Health Advocates**: Accessible wellness tool

### Real-World Applications

1. **Personal Wellness**: Daily emotional check-ins
2. **Therapy Supplement**: Share insights with therapist
3. **Stress Management**: Identify triggers and patterns
4. **Mindfulness Practice**: Guided self-reflection
5. **Research**: Aggregate anonymous emotional data

---

## 🚀 Future Enhancements

### Phase 1 (Short-term)

- [ ] User authentication (JWT)
- [ ] Email reminders for daily journaling
- [ ] Export entries as PDF
- [ ] Dark mode theme

### Phase 2 (Medium-term)

- [ ] Weekly emotional reports
- [ ] Mood prediction using ML
- [ ] Integration with calendar apps
- [ ] Share entries with trusted contacts

### Phase 3 (Long-term)

- [ ] Mobile app (React Native)
- [ ] Wearable device integration
- [ ] Therapist dashboard
- [ ] Community features (anonymous support groups)
- [ ] Multi-language support

---

## 💰 Cost Analysis

### Development

- Built during hackathon (~24-48 hours)
- Leverages existing APIs (OpenAI)
- Free/open-source tools

### Operational Costs (per user/month)

```
OpenAI API:
  - Text (10 entries): ~$0.10 - $0.30
  - Voice (5 minutes): ~$0.03 - $0.05
MongoDB Atlas:
  - Free tier: $0 (M0 cluster)
Hosting:
  - Vercel/Netlify: $0 (free tier)
  - Railway/Render: ~$5

Total: ~$0.15 - $5.35/user/month
```

**Scalable**: Costs decrease with volume discounts.

---

## 🎓 Learning Outcomes

### Technical Skills

- Full-stack web development
- OpenAI API integration (GPT-4 + Whisper)
- Real-time audio processing
- MongoDB/NoSQL databases
- Modern React patterns
- API design & REST principles

### Soft Skills

- Problem-solving under time constraints
- Product design & UX thinking
- Documentation writing
- Demo presentation
- Team collaboration (if applicable)

---

## 🏅 Competitive Advantages

1. **Complete MVP**: Fully functional, not just concept
2. **AI Integration**: Cutting-edge technology
3. **User-Centric**: Solves real problem
4. **Polished UI**: Professional design
5. **Scalable**: Cloud-ready architecture
6. **Well-Documented**: Easy for judges to understand

---

## 📞 Contact & Links

- **GitHub**: [Your Repo URL]
- **Demo**: [Live Demo URL]
- **Video**: [Demo Video URL]
- **Slides**: [Presentation Deck]

---

## 🙏 Acknowledgments

Built with:

- ❤️ Passion for mental wellness
- ☕ Lots of coffee
- 🎵 Good music
- 🚀 Determination to make a difference

**Special thanks to:**

- OpenAI for amazing APIs
- The open-source community
- Hackathon organizers

---

**Mental Wellness Mirror** - _Reflect, Understand, Grow_ 🪞✨

---

_Built for [Hackathon Name] - October 2025_
