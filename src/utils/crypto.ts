import { ENV } from '@config';
import * as crypto from 'crypto';
import moment from 'moment';

// Use the static secret key from ENV
const staticSecretKey: string = ENV.CRYPTO.SECRET!;

// Function to pad the key to the required length (256 bits)
export const padKey = (key: string): Buffer => {
  const keyBuffer = Buffer.from(key, 'utf-8');
  if (keyBuffer.length >= 32) {
    return keyBuffer.slice(0, 32); // Ensure key is 256 bits (32 bytes)
  } else {
    const paddedKey = Buffer.alloc(32);
    keyBuffer.copy(paddedKey);
    return paddedKey;
  }
};

// Encrypt data and add expiry time if provided in the data object
export const encryptData = (data: any, expiryTime?: string): string => {
  const iv = crypto.randomBytes(16); // Initialization Vector
  const cipher = crypto.createCipheriv(
    'aes-256-cbc',
    padKey(staticSecretKey),
    iv,
  );

  // If expiryTime is provided, convert it to a timestamp
  if (expiryTime) {
    const expiryTimestamp = moment().add(moment.duration(expiryTime)).valueOf();
    data.expiryTime = expiryTimestamp;
  }

  let encryptedData = cipher.update(JSON.stringify(data), 'utf-8', 'hex');
  encryptedData += cipher.final('hex');

  return `${iv.toString('hex')}:${encryptedData}`;
};

// Decrypt data and verify expiry if present
export const decryptData = <T>(encryptedData: string): T | null => {
  const [ivHex, encryptedText] = encryptedData.split(':');
  const iv = Buffer.from(ivHex, 'hex');

  const decipher = crypto.createDecipheriv(
    'aes-256-cbc',
    padKey(staticSecretKey),
    iv,
  );

  let decryptedData = decipher.update(encryptedText, 'hex', 'utf-8');
  decryptedData += decipher.final('utf-8');

  // Parse the decrypted data
  const parsedData = JSON.parse(decryptedData);

  // Check if expiryTime is present and verify if the data is still valid
  if (
    parsedData.expiryTime &&
    moment().isAfter(moment(parsedData.expiryTime))
  ) {
    return null; // Expired data, return null
  }

  // Return the decrypted data in the specified type
  return parsedData as T;
};
