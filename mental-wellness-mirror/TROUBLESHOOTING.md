# 🔧 Troubleshooting Guide

Common issues and their solutions for Mental Wellness Mirror.

---

## 🗄️ Database Issues

### Error: "MongooseServerSelectionError: connect ECONNREFUSED"

**Cause:** MongoDB is not running or connection string is wrong.

**Solutions:**

1. **Check if MongoDB is running:**

   ```bash
   # macOS
   brew services list | grep mongodb

   # Linux
   sudo systemctl status mongod

   # Windows
   net start | findstr MongoDB
   ```

2. **Start MongoDB:**

   ```bash
   # macOS
   brew services start mongodb-community

   # Linux
   sudo systemctl start mongod

   # Windows
   net start MongoDB
   ```

3. **Verify connection string in `server/.env`:**

   ```env
   MONGODB_URI=mongodb://localhost:27017/mental-wellness-mirror
   ```

4. **For Atlas:** Check username, password, and IP whitelist

---

### Error: "Authentication failed"

**Cause:** Wrong username/password for MongoDB Atlas.

**Solution:**

1. Go to MongoDB Atlas → Database Access
2. Verify username and password
3. Reset password if needed
4. Update `.env` with correct credentials
5. Ensure password has no special characters that need URL encoding

---

## 🔑 OpenAI API Issues

### Error: "401 Unauthorized"

**Cause:** Invalid or missing OpenAI API key.

**Solutions:**

1. **Verify API key:**

   - Open `server/.env`
   - Check `OPENAI_API_KEY=sk-...`
   - Key should start with `sk-`

2. **Get new key:**

   - Visit https://platform.openai.com/api-keys
   - Create new secret key
   - Copy and paste into `.env`

3. **Check for spaces:**

   ```env
   # ❌ Wrong (has space)
   OPENAI_API_KEY= sk-abc123

   # ✅ Correct
   OPENAI_API_KEY=sk-abc123
   ```

4. **Restart server** after changing `.env`

---

### Error: "429 Too Many Requests" or "Insufficient credits"

**Cause:** Rate limit exceeded or no credits left.

**Solutions:**

1. **Check usage:** https://platform.openai.com/account/usage
2. **Add payment method:** https://platform.openai.com/account/billing
3. **Wait a minute** (rate limit resets)
4. **Use GPT-3.5** instead (cheaper):
   - Edit `server/controllers/analyzeController.js`
   - Change `model: 'gpt-4'` to `model: 'gpt-3.5-turbo'`

---

### Error: "The model 'gpt-4' does not exist"

**Cause:** Your OpenAI account doesn't have GPT-4 access yet.

**Solution:**

Use GPT-3.5-turbo instead:

```javascript
// server/controllers/analyzeController.js
const completion = await openai.chat.completions.create({
  model: "gpt-3.5-turbo", // Change this line
  messages: [
    /* ... */
  ],
});
```

---

## 🎤 Microphone/Voice Issues

### Error: "NotAllowedError: Permission denied"

**Cause:** Browser blocked microphone access.

**Solutions:**

1. **Chrome:**

   - Click 🔒 lock icon in address bar
   - Allow Microphone
   - Refresh page

2. **Firefox:**

   - Click 🔒 in address bar
   - Permissions → Microphone → Allow
   - Refresh

3. **Safari:**

   - Safari menu → Settings → Websites → Microphone
   - Select "Allow" for localhost

4. **System Level:**
   - macOS: System Preferences → Security & Privacy → Microphone → Check browser
   - Windows: Settings → Privacy → Microphone → Allow apps

---

### Voice recording doesn't work on mobile

**Cause:** Mobile browsers require HTTPS for MediaRecorder API.

**Solutions:**

1. **Use ngrok for local testing:**

   ```bash
   npm install -g ngrok
   ngrok http 3000
   ```

   - Visit the HTTPS URL provided

2. **Deploy to production** (automatic HTTPS on Vercel/Netlify)

---

### Audio file upload fails

**Cause:** File too large or wrong format.

**Solutions:**

1. **Check file size** (limit: 25MB)
2. **Verify audio format** (should be webm/mp3/wav)
3. **Check `uploads/` folder exists** in server directory
4. **Increase limit** if needed:
   ```javascript
   // server/routes/analyzeRoutes.js
   const upload = multer({
     storage,
     limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
   });
   ```

---

## 🌐 Network/CORS Issues

### Error: "CORS policy: No 'Access-Control-Allow-Origin'"

**Cause:** Backend not allowing frontend requests.

**Solutions:**

1. **Verify CORS is enabled** in `server/index.js`:

   ```javascript
   app.use(cors());
   ```

2. **For specific origin:**

   ```javascript
   app.use(
     cors({
       origin: "http://localhost:3000",
     })
   );
   ```

3. **Check proxy in `client/vite.config.js`:**
   ```javascript
   server: {
     proxy: {
       '/api': 'http://localhost:5000',
     },
   }
   ```

---

### Error: "Failed to fetch" or "Network Error"

**Cause:** Backend not running or wrong URL.

**Solutions:**

1. **Check backend is running:**

   ```bash
   curl http://localhost:5000/api/health
   ```

2. **Verify API URL** in `client/src/api/api.js`:

   ```javascript
   const API_BASE_URL = "http://localhost:5000/api";
   ```

3. **Check firewall** not blocking port 5000

---

## 🔌 Port Issues

### Error: "EADDRINUSE: address already in use :::5000"

**Cause:** Port 5000 is already being used.

**Solutions:**

1. **Kill process on port 5000:**

   ```bash
   # macOS/Linux
   lsof -ti:5000 | xargs kill -9

   # Windows
   netstat -ano | findstr :5000
   taskkill /PID <PID> /F
   ```

2. **Use different port:**

   - Edit `server/.env`: `PORT=5001`
   - Update frontend API URL

3. **Find what's using the port:**
   ```bash
   lsof -i :5000
   ```

---

## 📦 Dependency Issues

### Error: "Cannot find module 'xyz'"

**Cause:** Dependencies not installed.

**Solutions:**

1. **Install dependencies:**

   ```bash
   # Root
   npm install

   # Server
   cd server && npm install

   # Client
   cd client && npm install
   ```

2. **Clear cache and reinstall:**

   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Check Node version:**
   ```bash
   node --version  # Should be v18+
   ```

---

### Error: "Module not found: Can't resolve 'X'"

**Cause:** Frontend import error.

**Solutions:**

1. **Check import path:**

   ```javascript
   // ❌ Wrong
   import api from "api/api";

   // ✅ Correct
   import api from "../api/api";
   ```

2. **Restart Vite dev server** (Ctrl+C, then `npm run dev`)

---

## 🎨 UI/Styling Issues

### Tailwind classes not working

**Cause:** PostCSS or Tailwind misconfigured.

**Solutions:**

1. **Verify `tailwind.config.js` content paths:**

   ```javascript
   content: [
     "./index.html",
     "./src/**/*.{js,ts,jsx,tsx}",
   ],
   ```

2. **Check `postcss.config.js` exists:**

   ```javascript
   export default {
     plugins: {
       tailwindcss: {},
       autoprefixer: {},
     },
   };
   ```

3. **Restart Vite** after config changes

---

### Animations not working

**Cause:** Framer Motion not imported or configured.

**Solution:**

Check import:

```javascript
import { motion } from "framer-motion";
```

---

## 📊 Chart Issues

### Chart not displaying

**Cause:** Chart.js not registered or no data.

**Solutions:**

1. **Verify Chart.js registration** in `EmotionChart.jsx`:

   ```javascript
   ChartJS.register(
     CategoryScale,
     LinearScale
     // ... other scales
   );
   ```

2. **Check data exists:**

   - Need at least 1 entry for chart
   - Create test entries

3. **Console errors?** Check browser DevTools

---

## 🔄 Build/Deployment Issues

### Build fails: "RollupError: Could not resolve..."

**Cause:** Missing dependency or wrong import.

**Solution:**

1. **Check all dependencies installed**
2. **Verify import paths** (use relative paths)
3. **Clear build cache:**
   ```bash
   rm -rf dist
   npm run build
   ```

---

### Production app can't reach API

**Cause:** Hardcoded localhost URL.

**Solution:**

Update `client/src/api/api.js`:

```javascript
const API_BASE_URL = import.meta.env.PROD
  ? "https://your-backend.com/api"
  : "http://localhost:5000/api";
```

---

## 🐛 General Debugging Tips

### Check Browser Console

1. Open DevTools (F12)
2. Go to Console tab
3. Look for red errors
4. Read error messages carefully

### Check Server Logs

1. Look at terminal where server is running
2. Read error messages
3. Check stack traces

### Test API Directly

```bash
# Health check
curl http://localhost:5000/api/health

# Test analyze-text
curl -X POST http://localhost:5000/api/analyze-text \
  -H "Content-Type: application/json" \
  -d '{"text":"I feel happy today"}'
```

### Clear Everything and Start Fresh

```bash
# Stop all servers (Ctrl+C)

# Server
cd server
rm -rf node_modules package-lock.json
npm install
npm run dev

# Client (in new terminal)
cd client
rm -rf node_modules package-lock.json dist
npm install
npm run dev
```

---

## 🆘 Still Stuck?

### Quick Checks:

1. ✅ Node.js v18+ installed?
2. ✅ MongoDB running?
3. ✅ `.env` file correct?
4. ✅ Dependencies installed?
5. ✅ Both servers running?
6. ✅ No console errors?

### Get Help:

1. Re-read README.md
2. Check QUICKSTART.md
3. Review PROJECT_STRUCTURE.md
4. Search error message on Google
5. Check OpenAI API status
6. Open GitHub issue with:
   - Error message
   - Steps to reproduce
   - Your environment (OS, Node version)

---

**Pro tip:** When reporting issues, always include:

- Exact error message
- What you were trying to do
- What you expected vs what happened
- Your environment (OS, Node version, browser)

Good luck! 🍀
