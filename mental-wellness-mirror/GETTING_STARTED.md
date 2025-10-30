# 🚀 Getting Started - Complete Guide

Everything you need to run Mental Wellness Mirror from scratch.

---

## ⏱️ Time Required

- **Quick Setup**: 5-10 minutes
- **Full Setup + Testing**: 15-20 minutes
- **First Demo**: Ready immediately after setup!

---

## 📋 Prerequisites Checklist

Before starting, ensure you have:

- [ ] **Node.js v18+** installed → [Download](https://nodejs.org/)
- [ ] **MongoDB** (local or Atlas account) → [Install](https://www.mongodb.com/docs/manual/installation/) or [Atlas](https://www.mongodb.com/cloud/atlas)
- [ ] **OpenAI API Key** → [Get one](https://platform.openai.com/api-keys)
- [ ] **Text editor** (VS Code recommended)
- [ ] **Terminal/Command Prompt** access
- [ ] **Web browser** (Chrome, Firefox, Safari, or Edge)

### Quick Version Check

```bash
# Check Node.js version (should be 18+)
node --version

# Check npm version
npm --version

# Check if MongoDB is installed (optional if using Atlas)
mongod --version
```

---

## 🛠️ Installation Steps

### Option 1: Automated Setup (Recommended)

```bash
# Navigate to project directory
cd mental-wellness-mirror

# Run setup script
./setup.sh

# Follow on-screen instructions
```

### Option 2: Manual Setup

#### Step 1: Install Dependencies

```bash
# From project root
npm run install-all

# This installs:
# - Root dependencies (concurrently)
# - Server dependencies (express, mongoose, openai, etc.)
# - Client dependencies (react, vite, tailwind, etc.)
```

#### Step 2: Configure Environment

```bash
# Navigate to server directory
cd server

# Copy example env file
cp .env.example .env

# Edit .env file with your credentials
nano .env  # or use your preferred editor
```

Add your actual values:

```env
OPENAI_API_KEY=sk-your-actual-key-here
MONGODB_URI=mongodb://localhost:27017/mental-wellness-mirror
PORT=5000
```

**For MongoDB Atlas**, use:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mental-wellness-mirror
```

#### Step 3: Start MongoDB (if local)

```bash
# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows
net start MongoDB
```

#### Step 4: Start the Application

```bash
# From project root
npm run dev
```

You should see:

```
[server] ✅ Connected to MongoDB
[server] 🚀 Server running on http://localhost:5000
[client] VITE ready in 847ms
[client] ➜ Local: http://localhost:3000
```

---

## 🌐 Access the App

Open your browser and visit:

**Frontend:** http://localhost:3000  
**Backend API:** http://localhost:5000/api/health

---

## 🎯 Quick Test

### 1. Create Your First Text Entry

1. Go to http://localhost:3000
2. Click **"New Entry"** in the header
3. Ensure **"Text Entry"** is selected
4. Type in the textarea:
   ```
   I'm feeling a bit stressed about my upcoming presentation at work.
   ```
5. Click **"Analyze My Entry"**
6. Wait 3-5 seconds
7. See the AI analysis with mood and insight! 🎉

### 2. Try Voice Recording

1. Stay on the "New Entry" page
2. Click **"Voice Entry"** tab
3. Click **"Start Recording"**
4. Allow microphone access when prompted
5. Speak naturally for 5-10 seconds:
   ```
   "Today was a great day. I went for a run and felt really energized."
   ```
6. Click **"Stop Recording"**
7. Click **"Analyze My Voice"**
8. Wait 5-10 seconds
9. See transcription + analysis! 🎤

### 3. View Your Dashboard

1. Click **"Dashboard"** in the header
2. See your entries displayed
3. View the emotion chart (if you have multiple entries)
4. Try filtering by "Text Only" or "Voice Only"

---

## 🔧 Development Commands

### Running the App

```bash
# Start both servers (from root)
npm run dev

# Start only backend (from server/)
cd server && npm run dev

# Start only frontend (from client/)
cd client && npm run dev
```

### Building for Production

```bash
# Build frontend
cd client
npm run build

# Preview production build
npm run preview
```

### Other Useful Commands

```bash
# Install a new package (backend)
cd server && npm install package-name

# Install a new package (frontend)
cd client && npm install package-name

# Check for port usage
lsof -i :5000  # Backend
lsof -i :3000  # Frontend
```

---

## 📁 Project Navigation

### Important Directories

```bash
# Backend code
cd server/

# Frontend code
cd client/src/

# Components
cd client/src/components/

# Pages
cd client/src/pages/

# API service
cd client/src/api/
```

### Key Files to Know

| File                                      | Purpose           | When to Edit            |
| ----------------------------------------- | ----------------- | ----------------------- |
| `server/.env`                             | API keys & config | Initial setup           |
| `server/index.js`                         | Express server    | Add middleware/routes   |
| `server/controllers/analyzeController.js` | AI logic          | Change AI prompts       |
| `client/src/App.jsx`                      | Main app          | Add routes              |
| `client/src/components/JournalInput.jsx`  | Journal UI        | Modify input experience |
| `client/tailwind.config.js`               | Styling           | Change theme colors     |

---

## 🎨 Customization Quick Start

### Change Theme Colors

Edit `client/tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        500: '#your-color-here',
      }
    }
  }
}
```

### Add New Mood Emoji

Edit `client/src/components/InsightCard.jsx`:

```javascript
const moodEmoji = {
  excited: "🤩",
  motivated: "💪",
  // Add your own...
};
```

### Use GPT-3.5 (Cheaper)

Edit `server/controllers/analyzeController.js`:

```javascript
model: 'gpt-3.5-turbo', // Instead of 'gpt-4'
```

### Add Custom System Prompt

Edit `server/controllers/analyzeController.js`:

```javascript
{
  role: 'system',
  content: 'Your custom prompt here...'
}
```

---

## 🐛 Common Issues & Fixes

### "Cannot connect to MongoDB"

**Fix:**

```bash
# Check if MongoDB is running
brew services list | grep mongodb

# Start it
brew services start mongodb-community
```

### "OpenAI API error"

**Fix:**

1. Check your API key in `server/.env`
2. Verify you have credits: https://platform.openai.com/account/usage
3. Remove any extra spaces in `.env`

### "Port 5000 already in use"

**Fix:**

```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9
```

### "Microphone not working"

**Fix:**

1. Allow microphone in browser settings
2. Must use `localhost` (MediaRecorder requires secure context)

More solutions → See `TROUBLESHOOTING.md`

---

## 📚 Documentation Index

### For Setup & Installation

- 📄 **QUICKSTART.md** ← You are here!
- 📄 **DATABASE.md** - MongoDB setup details
- 📄 **TROUBLESHOOTING.md** - Error solutions

### For Understanding the Project

- 📄 **README.md** - Full documentation
- 📄 **PROJECT_STRUCTURE.md** - File organization
- 📄 **PROJECT_SUMMARY.md** - Visual overview
- 📄 **FILE_INVENTORY.md** - Complete file list

### For Demo & Presentation

- 📄 **DEMO_SCRIPT.md** - Presentation guide
- 📄 **CHECKLIST.md** - Pre-launch checklist

---

## 🎯 Next Steps

### Immediate Next Steps (5 minutes)

1. ✅ Complete installation
2. ✅ Create 3-4 test entries (mix text & voice)
3. ✅ Verify dashboard displays correctly

### Short-term Goals (1 hour)

1. Read through `PROJECT_STRUCTURE.md`
2. Explore the codebase
3. Customize theme colors
4. Practice demo flow

### For Hackathon Presentation

1. Review `DEMO_SCRIPT.md`
2. Create 5-6 diverse entries for chart
3. Practice presentation
4. Prepare Q&A responses

---

## 💡 Pro Tips

### For Development

- Keep both terminal windows visible (server + client)
- Use browser DevTools (F12) to debug
- Check both browser console and server logs for errors
- Save files frequently (nodemon/Vite auto-reload)

### For Demo

- Pre-create diverse entries (happy, sad, stressed, calm)
- Test microphone before presenting
- Have backup text ready to paste
- Clear browser cache before demo
- Use full-screen mode for clean look

### For Learning

- Read code comments
- Experiment with changes
- Break things and fix them
- Ask "why?" for each file/function

---

## 🆘 Need Help?

### Quick Checks

1. Are both servers running? (`npm run dev`)
2. Is MongoDB connected? (check server logs)
3. Is `.env` configured? (OpenAI key + MongoDB URI)
4. Any errors in browser console?
5. Any errors in server terminal?

### Resources

- **Documentation**: All `.md` files in root
- **Troubleshooting**: `TROUBLESHOOTING.md`
- **OpenAI Docs**: https://platform.openai.com/docs
- **MongoDB Docs**: https://www.mongodb.com/docs

### Still Stuck?

1. Re-read error message carefully
2. Search error on Google/Stack Overflow
3. Check OpenAI API status
4. Review `TROUBLESHOOTING.md`
5. Create GitHub issue with details

---

## 🎉 You're All Set!

If you can:

- ✅ See the app at http://localhost:3000
- ✅ Create a text entry
- ✅ Create a voice entry
- ✅ View dashboard

**You're ready to go! 🚀**

---

## 📞 Quick Reference

| What         | Where                            |
| ------------ | -------------------------------- |
| Frontend     | http://localhost:3000            |
| Backend      | http://localhost:5000            |
| Health Check | http://localhost:5000/api/health |
| MongoDB      | mongodb://localhost:27017        |
| Logs         | Terminal windows                 |
| DevTools     | Browser F12                      |

---

**Happy Hacking! 🪞✨**

_Mental Wellness Mirror - Reflect, Understand, Grow_
