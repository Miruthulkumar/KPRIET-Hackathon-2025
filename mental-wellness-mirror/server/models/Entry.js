import mongoose from "mongoose";

const entrySchema = new mongoose.Schema({
  userId: {
    type: String,
    default: "default-user", // For demo purposes; add auth later
  },
  entryType: {
    type: String,
    enum: ["text", "voice"],
    required: true,
  },
  content: {
    type: String,
    required: function () {
      return this.entryType === "text";
    },
  },
  transcript: {
    type: String,
    required: function () {
      return this.entryType === "voice";
    },
  },
  mood: {
    type: String,
    required: true,
  },
  insight: {
    type: String,
    required: true,
  },
  stressScore: {
    type: Number,
    min: 0,
    max: 100,
    required: true,
  },
  anxietyScore: {
    type: Number,
    min: 0,
    max: 100,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Entry = mongoose.model("Entry", entrySchema);

export default Entry;

