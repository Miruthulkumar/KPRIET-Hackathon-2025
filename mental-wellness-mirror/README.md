# 🪞 Mental Wellness Mirror

An AI-powered web application that helps users reflect on their emotions through journaling. Built with React, Node.js, Express, MongoDB, and OpenAI's GPT-4 and Whisper APIs.

![Mental Wellness Mirror](https://img.shields.io/badge/Status-Hackathon%20Ready-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)

## ✨ Features

- 📝 **Text Journaling**: Write your thoughts and feelings
- 🎤 **Voice Journaling**: Record voice notes (transcribed via Whisper)
- 🧠 **AI Analysis**: Emotional tone analysis via GPT-4
- 💡 **Personalized Insights**: Receive calm, humanlike reflections
- 📊 **Emotion Tracking**: Visualize your emotional journey with charts
- 🎨 **Beautiful UI**: Soft pastel gradients with smooth animations

## 🛠️ Tech Stack

### Frontend

- React 18
- Vite
- Tailwind CSS
- React Router
- Axios
- Chart.js
- Framer Motion
- MediaRecorder API

### Backend

- Node.js
- Express
- MongoDB (Mongoose)
- OpenAI API (GPT-4 + Whisper)
- Multer
- CORS

## 📋 Prerequisites

Before you begin, ensure you have:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (local or Atlas) - [Install](https://www.mongodb.com/docs/manual/installation/)
- **OpenAI API Key** - [Get one here](https://platform.openai.com/api-keys)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd mental-wellness-mirror
```

### 2. Install Dependencies

```bash
npm run install-all
```

This will install dependencies for both client and server.

### 3. Configure Environment Variables

Create a `.env` file in the `server/` directory:

```bash
cd server
cp .env.example .env
```

Edit `server/.env` and add your credentials:

```env
OPENAI_API_KEY=sk-your-openai-api-key-here
MONGODB_URI=mongodb://localhost:27017/mental-wellness-mirror
PORT=5000
```

**For MongoDB Atlas (cloud):**

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mental-wellness-mirror?retryWrites=true&w=majority
```

### 4. Start MongoDB (if using local)

```bash
# macOS (with Homebrew)
brew services start mongodb-community

# Windows (run as service or manually)
mongod

# Linux
sudo systemctl start mongod
```

### 5. Run the Application

From the root directory:

```bash
npm run dev
```

This starts both the backend (port 5000) and frontend (port 3000) concurrently.

**Access the app:**

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api

## 📁 Project Structure

```
mental-wellness-mirror/
├── client/                      # React frontend
│   ├── src/
│   │   ├── api/
│   │   │   └── api.js          # API service layer
│   │   ├── components/
│   │   │   ├── JournalInput.jsx    # Main journal input component
│   │   │   ├── VoiceRecorder.jsx   # Voice recording component
│   │   │   ├── InsightCard.jsx     # AI insight display
│   │   │   └── EmotionChart.jsx    # Chart.js emotion trend
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx       # Main dashboard
│   │   │   ├── JournalPage.jsx     # Journal entry page
│   │   │   └── InsightPage.jsx     # Individual entry view
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
│
├── server/                      # Node.js backend
│   ├── controllers/
│   │   ├── analyzeController.js    # OpenAI analysis logic
│   │   └── entryController.js      # Entry CRUD operations
│   ├── models/
│   │   └── Entry.js                # MongoDB Entry schema
│   ├── routes/
│   │   ├── analyzeRoutes.js        # /api/analyze-* endpoints
│   │   └── entryRoutes.js          # /api/entries endpoints
│   ├── uploads/                    # Temporary audio storage
│   ├── index.js                    # Express server
│   ├── package.json
│   └── .env                        # Environment variables
│
├── package.json                 # Root package for concurrently
└── README.md
```

## 🔌 API Endpoints

### Analyze Endpoints

#### POST `/api/analyze-text`

Analyzes text journal entries.

**Request:**

```json
{
  "text": "I had a really stressful day at work..."
}
```

**Response:**

```json
{
  "mood": "stressed",
  "insight": "It sounds like you've been under a lot of pressure. Consider taking short breaks throughout your day to recharge."
}
```

#### POST `/api/analyze-voice`

Analyzes voice recordings (transcribes + analyzes).

**Request:**

- `multipart/form-data` with `audio` field (audio file)

**Response:**

```json
{
  "transcript": "I had a really stressful day at work...",
  "mood": "stressed",
  "insight": "It sounds like you've been under a lot of pressure..."
}
```

### Entry Endpoints

#### POST `/api/entries`

Saves a journal entry.

**Request:**

```json
{
  "entryType": "text",
  "content": "I had a really stressful day...",
  "mood": "stressed",
  "insight": "It sounds like you've been under a lot of pressure..."
}
```

#### GET `/api/entries`

Retrieves all entries.

**Query Parameters:**

- `type` (optional): Filter by `text` or `voice`
- `limit` (optional): Max number of entries (default: 50)

#### GET `/api/entries/:id`

Retrieves a specific entry by ID.

#### DELETE `/api/entries/:id`

Deletes an entry by ID.

## 🎨 UI Features

- **Soft Pastel Gradients**: Purple, pink, and blue tones
- **Smooth Animations**: Framer Motion transitions
- **Responsive Design**: Works on desktop and mobile
- **Real-time Recording**: Live audio capture with timer
- **Interactive Charts**: Visualize emotional trends over time

## 🧪 Testing the App

### Test Text Entry

1. Navigate to "New Entry"
2. Select "Text Entry"
3. Write: "I feel really anxious about my upcoming presentation"
4. Click "Analyze My Entry"
5. See AI-generated mood + insight

### Test Voice Entry

1. Navigate to "New Entry"
2. Select "Voice Entry"
3. Click "Start Recording"
4. Speak for 5-10 seconds
5. Click "Stop Recording"
6. Click "Analyze My Voice"
7. See transcription + AI analysis

### View Dashboard

1. Return to Dashboard
2. See emotion trend chart
3. Filter entries by type
4. Delete entries

## 🔧 Troubleshooting

### MongoDB Connection Issues

**Error:** `MongooseServerSelectionError`

**Solution:**

- Check if MongoDB is running: `brew services list` (macOS)
- Verify connection string in `.env`
- For Atlas, check IP whitelist and credentials

### OpenAI API Issues

**Error:** `401 Unauthorized`

**Solution:**

- Verify API key in `server/.env`
- Check API key has sufficient credits
- Ensure no extra spaces in `.env` file

### Microphone Access Issues

**Error:** Microphone permission denied

**Solution:**

- Allow microphone access in browser settings
- Use HTTPS or localhost (required for MediaRecorder)

### Port Already in Use

**Error:** `EADDRINUSE`

**Solution:**

```bash
# Find and kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Or change PORT in server/.env
```

## 🚢 Deployment

### Deploy Backend (Heroku/Railway/Render)

1. Set environment variables:

   - `OPENAI_API_KEY`
   - `MONGODB_URI`
   - `PORT`

2. Deploy from `server/` directory

### Deploy Frontend (Vercel/Netlify)

1. Build the client:

   ```bash
   cd client
   npm run build
   ```

2. Update API URL in `client/src/api/api.js`:

   ```javascript
   const API_BASE_URL = "https://your-backend-url.com/api";
   ```

3. Deploy the `dist/` folder

## 📝 Future Enhancements

- [ ] User authentication (JWT/OAuth)
- [ ] Export journal entries as PDF
- [ ] Email reminders for daily journaling
- [ ] Sentiment analysis trends (weekly/monthly)
- [ ] Share insights with therapists
- [ ] Dark mode theme
- [ ] Mobile app (React Native)

## 🤝 Contributing

This is a hackathon project! Feel free to fork and improve.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - feel free to use this for your own projects!

## 🙏 Acknowledgments

- **OpenAI** for GPT-4 and Whisper APIs
- **Chart.js** for beautiful data visualization
- **Framer Motion** for smooth animations
- **Tailwind CSS** for rapid styling

## 📧 Support

For questions or issues:

- Open an issue on GitHub
- Email: [your-email@example.com]

---

**Built with ❤️ for mental wellness**

Happy journaling! 🪞✨
