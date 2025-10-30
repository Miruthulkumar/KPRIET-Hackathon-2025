#!/bin/bash

echo "🪞 Mental Wellness Mirror - Setup Script"
echo "========================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "❌ Node.js is not installed. Please install Node.js v18+ from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo ""

# Check if MongoDB is installed (optional)
if command -v mongod &> /dev/null
then
    echo "✅ MongoDB is installed"
else
    echo "⚠️  MongoDB not found locally. You can use MongoDB Atlas instead."
fi
echo ""

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install
echo ""

# Install server dependencies
echo "📦 Installing server dependencies..."
cd server
npm install
echo ""

# Setup .env file
if [ ! -f .env ]; then
    echo "📝 Creating server/.env file..."
    cp .env.example .env
    echo ""
    echo "⚠️  IMPORTANT: Please edit server/.env and add your:"
    echo "   - OPENAI_API_KEY (get from https://platform.openai.com/api-keys)"
    echo "   - MONGODB_URI (use local or MongoDB Atlas)"
    echo ""
else
    echo "✅ server/.env already exists"
    echo ""
fi

# Install client dependencies
cd ../client
echo "📦 Installing client dependencies..."
npm install
echo ""

cd ..

echo "✅ Setup complete!"
echo ""
echo "📖 Next steps:"
echo "   1. Edit server/.env with your OpenAI API key and MongoDB URI"
echo "   2. Start MongoDB (if using local): brew services start mongodb-community"
echo "   3. Run: npm run dev"
echo "   4. Open: http://localhost:3000"
echo ""
echo "Happy journaling! 🪞✨"
