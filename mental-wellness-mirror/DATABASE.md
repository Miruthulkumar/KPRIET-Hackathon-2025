# 🗄️ Database Setup Options

## Option 1: Local MongoDB (Recommended for Development)

### Install MongoDB

**macOS:**

```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Windows:**
Download from: https://www.mongodb.com/try/download/community

**Linux (Ubuntu):**

```bash
sudo apt-get install mongodb
sudo systemctl start mongodb
```

### Use in .env:

```env
MONGODB_URI=mongodb://localhost:27017/mental-wellness-mirror
```

---

## Option 2: MongoDB Atlas (Free Cloud Database)

### Setup Steps:

1. **Sign Up**

   - Go to https://www.mongodb.com/cloud/atlas
   - Create free account
   - Click "Build a Database"

2. **Create Cluster**

   - Choose "M0 Sandbox" (FREE)
   - Select region (closest to you)
   - Click "Create"

3. **Create Database User**

   - Go to "Database Access"
   - Add new user
   - Username: `wellness_user`
   - Password: Generate strong password
   - Save credentials!

4. **Whitelist IP**

   - Go to "Network Access"
   - Click "Add IP Address"
   - Choose "Allow Access from Anywhere" (for dev)
   - Or add your specific IP

5. **Get Connection String**

   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy connection string
   - Looks like: `mongodb+srv://wellness_user:<password>@cluster0.xxxxx.mongodb.net/`

6. **Update .env**

```env
MONGODB_URI=mongodb+srv://wellness_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/mental-wellness-mirror?retryWrites=true&w=majority
```

Replace:

- `YOUR_PASSWORD` with actual password
- Keep the database name: `mental-wellness-mirror`

---

## Option 3: Docker MongoDB

```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

Use same local connection string.

---

## Verify Connection

After starting your server, you should see:

```
✅ Connected to MongoDB
🚀 Server running on http://localhost:5000
```

If you see errors:

- Check connection string has no spaces
- Verify username/password are correct
- Ensure IP is whitelisted (Atlas)
- Check if MongoDB is running (local)

---

## Database Structure

The app creates one collection automatically:

### `entries` Collection

```javascript
{
  _id: ObjectId,
  userId: String,
  entryType: "text" | "voice",
  content: String,       // for text entries
  transcript: String,    // for voice entries
  mood: String,
  insight: String,
  createdAt: Date
}
```

No manual setup needed - Mongoose handles everything!

---

## View Your Data

### MongoDB Compass (GUI)

Download: https://www.mongodb.com/products/compass

Connect with your `MONGODB_URI` to browse entries.

### MongoDB Atlas Dashboard

View data directly in Atlas web interface.

---

## Backup Your Data (Optional)

```bash
# Export data
mongodump --uri="YOUR_MONGODB_URI" --out=./backup

# Import data
mongorestore --uri="YOUR_MONGODB_URI" ./backup
```

---

**Tip:** For hackathons, Atlas is easiest - no local install needed!
