import mongoose from "mongoose";
import { encrypt, decrypt } from "../utils/encryption.js";

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

// Encrypt sensitive fields before saving to database
entrySchema.pre('save', function(next) {
  try {
    // Encrypt content if it exists and is not already encrypted
    if (this.content && this.isModified('content')) {
      this.content = encrypt(this.content);
    }
    
    // Encrypt transcript if it exists and is not already encrypted
    if (this.transcript && this.isModified('transcript')) {
      this.transcript = encrypt(this.transcript);
    }
    
    // Encrypt insight
    if (this.insight && this.isModified('insight')) {
      this.insight = encrypt(this.insight);
    }
    
    next();
  } catch (error) {
    next(error);
  }
});

// Decrypt sensitive fields when retrieving from database
entrySchema.post('find', function(docs) {
  if (docs && Array.isArray(docs)) {
    docs.forEach(doc => decryptEntry(doc));
  }
});

entrySchema.post('findOne', function(doc) {
  if (doc) {
    decryptEntry(doc);
  }
});

entrySchema.post('findOneAndUpdate', function(doc) {
  if (doc) {
    decryptEntry(doc);
  }
});

// Helper function to decrypt entry fields
function decryptEntry(doc) {
  // Decrypt fields - the decrypt function now handles backward compatibility
  // and will return plain text as-is if it's not encrypted
  if (doc.content) {
    doc.content = decrypt(doc.content);
  }
  if (doc.transcript) {
    doc.transcript = decrypt(doc.transcript);
  }
  if (doc.insight) {
    doc.insight = decrypt(doc.insight);
  }
}

// Method to get decrypted entry data
entrySchema.methods.getDecryptedData = function() {
  return {
    _id: this._id,
    userId: this.userId,
    entryType: this.entryType,
    content: this.content ? decrypt(this.content) : undefined,
    transcript: this.transcript ? decrypt(this.transcript) : undefined,
    mood: this.mood,
    insight: this.insight ? decrypt(this.insight) : undefined,
    stressScore: this.stressScore,
    anxietyScore: this.anxietyScore,
    createdAt: this.createdAt,
  };
};

const Entry = mongoose.model("Entry", entrySchema);

export default Entry;
