# 🚀 Quick Start Guide

## Step-by-Step Setup (5 minutes)

### 1️⃣ Install Dependencies

```bash
cd mental-wellness-mirror
npm run install-all
```

Or run the automated setup:

```bash
./setup.sh
```

### 2️⃣ Get Your OpenAI API Key

1. Go to https://platform.openai.com/api-keys
2. Sign up or log in
3. Click "Create new secret key"
4. Copy your key (starts with `sk-...`)

### 3️⃣ Configure Environment

```bash
cd server
cp .env.example .env
nano .env  # or use any text editor
```

Add your credentials:

```env
OPENAI_API_KEY=sk-your-actual-key-here
MONGODB_URI=mongodb://localhost:27017/mental-wellness-mirror
PORT=5000
```

**Using MongoDB Atlas?**
Get your connection string from Atlas and use:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mental-wellness-mirror
```

### 4️⃣ Start MongoDB (if local)

**macOS:**

```bash
brew services start mongodb-community
```

**Windows:**

```bash
net start MongoDB
```

**Linux:**

```bash
sudo systemctl start mongod
```

**Or use MongoDB Atlas** (no local install needed):

1. Sign up at https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get connection string
4. Add to `.env`

### 5️⃣ Run the App

```bash
cd ..  # back to root
npm run dev
```

**You should see:**

```
Server running on http://localhost:5000
VITE ready on http://localhost:3000
```

### 6️⃣ Open Your Browser

Go to: **http://localhost:3000**

---

## 🎯 Test Drive

### Create Your First Entry

1. Click **"New Entry"**
2. Choose **Text Entry**
3. Type: _"I'm feeling a bit stressed about my upcoming presentation"_
4. Click **"Analyze My Entry"**
5. Watch the AI magic! ✨

### Try Voice Recording

1. Click **"New Entry"**
2. Choose **Voice Entry**
3. Click **"Start Recording"**
4. Speak naturally for 5-10 seconds
5. Click **"Stop Recording"**
6. Click **"Analyze My Voice"**
7. See transcription + analysis!

### View Dashboard

- Return to **Dashboard**
- See your emotion trend chart
- Filter by Text/Voice entries
- Track your wellness journey

---

## 🆘 Troubleshooting

### "Cannot connect to MongoDB"

- Check if MongoDB is running: `brew services list`
- Or use MongoDB Atlas (cloud, no install)

### "OpenAI API error"

- Check your API key in `server/.env`
- Ensure you have credits: https://platform.openai.com/account/usage
- Remove any extra spaces in `.env`

### "Port 5000 already in use"

```bash
lsof -ti:5000 | xargs kill -9
```

### "Microphone not working"

- Allow microphone permission in browser
- Must use `localhost` or `https` for MediaRecorder

---

## 📊 API Costs

**OpenAI Pricing (approximate):**

- Text analysis (GPT-4): ~$0.01-0.03 per entry
- Voice transcription (Whisper): ~$0.006 per minute

**Budget-friendly tips:**

- Use GPT-3.5-turbo instead (change in `analyzeController.js`)
- OpenAI gives $5 free credits for new accounts
- Perfect for demos and testing!

---

## 🎨 Customization Ideas

### Change Theme Colors

Edit `client/tailwind.config.js`:

```javascript
colors: {
  primary: {
    500: '#your-color',
  }
}
```

### Add More Moods

Edit `client/src/components/InsightCard.jsx`:

```javascript
const moodEmoji = {
  excited: "🤩",
  motivated: "💪",
  // add more...
};
```

### Use GPT-3.5 (cheaper)

Edit `server/controllers/analyzeController.js`:

```javascript
model: 'gpt-3.5-turbo', // instead of 'gpt-4'
```

---

## 🏆 Demo Tips

1. **Pre-create 5-6 entries** before demo for better charts
2. **Use diverse moods** (happy, sad, anxious, calm)
3. **Test voice recording** beforehand
4. **Have backup entries** ready if API is slow

---

## 📱 Mobile Testing

The app is responsive! Test on:

- iPhone Safari
- Android Chrome
- iPad

_Note: Voice recording requires HTTPS on mobile (or use ngrok for local testing)_

---

## 🚢 Quick Deploy (Optional)

### Backend → Railway/Render

1. Push code to GitHub
2. Connect repo to Railway/Render
3. Add environment variables
4. Deploy!

### Frontend → Vercel

1. `cd client && npm run build`
2. Deploy `dist/` folder to Vercel
3. Update API URL in code

---

**Need help?** Open an issue on GitHub!

Happy hacking! 🪞✨
