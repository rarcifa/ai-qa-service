import crypto, { randomBytes, scryptSync, timingSafeEqual } from 'crypto';

/**
 * Provides security-related utility functions centered around API key generation and authentication.
 *
 * @fileoverview This file includes functions for creating secure API keys and secrets, as well as authenticating them.
 * @namespace security
 */
export const security = {
  /**
   * Generates a secure, random API key.
   * The key is generated using cryptographic random bytes and encoded in base64.
   *
   * @returns {string} A securely generated random string, encoded in base64 format, suitable as an API key.
   *
   * @example
   * const apiKey = security.generateApiKey();
   */
  generateApiKey: (): string => {
    const buffer: Buffer = crypto.randomBytes(32);
    return buffer.toString('base64');
  },

  /**
   * Generates a secure API secret using a provided key.
   * The method involves creating a cryptographic hash of the key, combined with a unique salt, using the scrypt algorithm.
   *
   * @param {crypto.BinaryLike} key - The key used as the basis for generating the API secret.
   * @returns {string} A securely generated API secret, consisting of a hash and a salt, separated by a period.
   *
   * @example
   * const apiSecret = security.generateApiSecret('your-key');
   */
  generateApiSecret: (key: crypto.BinaryLike): string => {
    const salt: string = randomBytes(8).toString('hex');
    const buffer: Buffer = scryptSync(key, salt, 64);
    return `${buffer.toString('hex')}.${salt}`;
  },

  /**
   * Validates a supplied API key against a pre-stored key for authentication.
   * This method uses the timing-safe equal comparison to mitigate timing attacks.
   *
   * @param {string} storedKey - The pre-stored API key, which includes both the hash and the salt.
   * @param {crypto.BinaryLike} suppliedKey - The API key supplied for validation.
   * @returns {boolean} Returns `true` if the supplied key matches the stored key, `false` otherwise.
   *
   * @example
   * const isValid = security.authenticateApiKey(storedApiKey, 'supplied-api-key');
   */
  authenticateApiKey: (storedKey: string, suppliedKey: crypto.BinaryLike): boolean => {
    const [hashedKey, salt]: string[] = storedKey.split('.');
    const buffer: Buffer = scryptSync(suppliedKey, salt, 64);
    return timingSafeEqual(Buffer.from(hashedKey, 'hex'), buffer);
  },
};
