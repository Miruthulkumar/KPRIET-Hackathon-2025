import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["user", "assistant"],
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const chatSchema = new mongoose.Schema({
  userId: {
    type: String,
    default: "default-user",
  },
  sessionId: {
    type: String,
    required: true,
    unique: true,
  },
  messages: [messageSchema],
  lastActivity: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Update lastActivity on save
chatSchema.pre("save", function (next) {
  this.lastActivity = Date.now();
  next();
});

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;