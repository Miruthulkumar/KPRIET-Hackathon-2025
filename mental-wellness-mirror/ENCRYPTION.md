# 🔒 Data Encryption & Privacy

## Overview

The Mental Wellness Mirror application implements **AES-256 encryption** to protect sensitive journal entries stored in MongoDB. This ensures that your personal thoughts, feelings, and journal content remain private and secure.

## What's Encrypted?

The following fields are automatically encrypted before being stored in the database:

1. **`content`** - Your written journal entries
2. **`transcript`** - Voice-to-text transcriptions
3. **`insight`** - AI-generated insights about your entries

## How It Works

### Encryption Flow

```
User Input → Frontend → Backend → Encrypt → MongoDB (encrypted)
                                            ↓
User Retrieves → Frontend ← Backend ← Decrypt ← MongoDB (encrypted)
```

### Technical Details

- **Algorithm**: AES-256 (Advanced Encryption Standard)
- **Library**: crypto-js
- **Key Storage**: Environment variable (`ENCRYPTION_KEY`)
- **Automatic**: Encryption/decryption happens transparently via Mongoose hooks

### Implementation

#### 1. **Encryption Utility** (`server/utils/encryption.js`)
- Provides `encrypt()` and `decrypt()` functions
- Uses AES-256 encryption with a secret key
- Handles errors gracefully

#### 2. **Database Model** (`server/models/Entry.js`)
- **Pre-save hook**: Automatically encrypts sensitive fields before saving
- **Post-find hooks**: Automatically decrypts fields when retrieving data
- Works seamlessly with all MongoDB operations

#### 3. **AI Analysis**
- Content is decrypted before being sent to AI APIs
- AI APIs (OpenRouter, Hugging Face) only receive temporary decrypted data
- Results are re-encrypted before storage

## Setup Instructions

### 1. Generate Encryption Key

Generate a strong, random encryption key:

```bash
# On macOS/Linux
openssl rand -base64 32

# Or use Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### 2. Add to Environment Variables

Add the generated key to your `.env` file:

```env
ENCRYPTION_KEY=your_generated_encryption_key_here
```

⚠️ **IMPORTANT**: 
- Never commit your `.env` file to version control
- Keep your encryption key secure and private
- Use different keys for development and production
- If the key is lost, encrypted data cannot be recovered

### 3. Restart Server

After adding the encryption key, restart your server for changes to take effect:

```bash
cd mental-wellness-mirror/server
npm start
```

## Security Best Practices

### ✅ DO:
- Use a strong, randomly generated encryption key (32+ characters)
- Keep your encryption key in environment variables only
- Use different keys for different environments (dev/prod)
- Regularly rotate encryption keys in production
- Backup your encryption key securely

### ❌ DON'T:
- Hardcode encryption keys in your code
- Commit `.env` files to Git
- Share encryption keys via insecure channels
- Use weak or predictable keys
- Store keys in the database

## Data Flow Security

### 1. **Client to Server** (HTTPS in Production)
```
Frontend → HTTPS → Backend API
```
- Use HTTPS in production to encrypt data in transit
- Sensitive data is sent over secure connections

### 2. **Server to Database**
```
Backend → Encrypt → MongoDB
```
- Data is encrypted before storage
- Even if database is compromised, data remains encrypted

### 3. **Server to AI APIs**
```
Backend → Decrypt → AI API (temporary) → Encrypt results → MongoDB
```
- Data is decrypted only when needed for analysis
- AI APIs don't store your data (per their policies)
- Results are re-encrypted immediately

## Encryption Key Rotation

If you need to change your encryption key:

1. **Export all entries** with old key
2. **Update** `ENCRYPTION_KEY` in `.env`
3. **Re-import** entries (they will be encrypted with new key)

⚠️ **Warning**: Changing the key will make existing encrypted data unreadable unless you migrate it.

## Privacy Guarantees

### What's Protected:
✅ Journal content (text and voice transcripts)
✅ AI-generated insights
✅ Data at rest in MongoDB
✅ Backup files (if using encrypted storage)

### What's NOT Encrypted:
❌ Metadata (timestamps, user IDs, scores)
❌ Mood labels (e.g., "happy", "sad")
❌ Stress/anxiety scores (numerical values)

**Reason**: These fields need to be queryable for analytics and report generation.

## Compliance Considerations

This encryption implementation helps with:
- **HIPAA**: Protects Protected Health Information (PHI)
- **GDPR**: Ensures data privacy for EU users
- **PIPEDA**: Canadian privacy compliance
- **General Privacy**: Best practices for sensitive data

## Testing Encryption

To verify encryption is working:

1. **Create a journal entry**
2. **Check MongoDB directly**:
```bash
mongo
use mental-wellness-mirror
db.entries.findOne()
```
3. **Verify**: The `content`, `transcript`, and `insight` fields should show encrypted strings
4. **Access via API**: The app should show decrypted, readable text

## Troubleshooting

### Problem: "Failed to decrypt data"
**Solution**: 
- Ensure `ENCRYPTION_KEY` in `.env` matches the key used to encrypt data
- Check if crypto-js is installed: `npm list crypto-js`

### Problem: Entries not readable
**Solution**:
- Verify encryption key hasn't changed
- Check server logs for decryption errors
- Ensure the key has at least 16 characters

### Problem: Performance issues
**Solution**:
- Encryption/decryption is fast for typical journal entries
- For large datasets, consider indexing non-encrypted fields
- Monitor server CPU usage

## Future Enhancements

Potential improvements for production:
- [ ] Client-side encryption (encrypt before sending to server)
- [ ] Key rotation mechanism
- [ ] Multi-layer encryption
- [ ] Hardware security module (HSM) integration
- [ ] Zero-knowledge architecture
- [ ] End-to-end encryption for multi-device sync

## Support

For security concerns or questions:
1. Check this documentation
2. Review the code in `server/utils/encryption.js`
3. Consult with a security professional for production deployments

---

**Remember**: Encryption is only as strong as your key management. Keep your encryption key secure! 🔐