import CryptoJS from 'crypto-js';

// Get encryption key from environment variable
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'default-key-change-this-in-production';

// Check if text is encrypted (AES encrypted strings have a specific format)
export const isEncrypted = (text) => {
  if (!text || typeof text !== 'string') return false;
  
  // AES encrypted strings from crypto-js ALWAYS start with "U2FsdGVkX1" (base64 of "Salted__")
  // This is the most reliable way to detect crypto-js AES encryption
  return text.startsWith('U2FsdGVkX1');
};

// Encrypt sensitive data
export const encrypt = (text) => {
  if (!text) return text;
  
  // Don't re-encrypt already encrypted data
  if (isEncrypted(text)) {
    return text;
  }
  
  try {
    const encrypted = CryptoJS.AES.encrypt(text, ENCRYPTION_KEY).toString();
    return encrypted;
  } catch (error) {
    console.error('Encryption error:', error);
    throw new Error('Failed to encrypt data');
  }
};

// Decrypt sensitive data with backward compatibility
export const decrypt = (encryptedText) => {
  if (!encryptedText) return encryptedText;
  
  // If it doesn't start with the AES prefix, it's plain text - return as-is
  if (!isEncrypted(encryptedText)) {
    return encryptedText;
  }
  
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedText, ENCRYPTION_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    
    // If decryption results in empty string, return original (wrong key or corrupted data)
    if (!decrypted) {
      return encryptedText;
    }
    
    return decrypted;
  } catch (error) {
    // Silent fail - return original text for backward compatibility
    return encryptedText;
  }
};

// Hash sensitive data (one-way, for comparison purposes)
export const hash = (text) => {
  if (!text) return text;
  try {
    return CryptoJS.SHA256(text).toString();
  } catch (error) {
    console.error('Hashing error:', error);
    throw new Error('Failed to hash data');
  }
};