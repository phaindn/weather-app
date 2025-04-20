import Cipher from '@/utils/cipher';
import { createTransform } from 'redux-persist';

const makeError = (message: string) => new Error(`[ReduxPersistEncrypt]: ${message}`);
type EncryptionConfig = {
  secretKey: string;
  onError?: (error: Error) => void;
}
export const encryptTransform = (config?: EncryptionConfig, transformConfig?: any) => {
  if (typeof config === 'undefined') {
    throw makeError('No configuration provided.');
  }
  const { secretKey } = config;
  if (!secretKey) {
    throw makeError('No secret key provided.');
  }
  const onError = typeof config.onError === 'function' ? config.onError : console.warn;

  const cipher = new Cipher(secretKey)
  return createTransform(
    (inboundState, _key) => cipher.encrypt(JSON.stringify(inboundState)).toString(),
    (outboundState, _key) => {
      if (typeof outboundState !== 'string') {
        return onError(makeError('Expected outbound state to be a string.'));
      }
      try {
        const decryptedString = cipher.decrypt(outboundState).toString();
        if (!decryptedString) {
          throw new Error('Decrypted string is empty.');
        }
        try {
          return JSON.parse(decryptedString);
        }
        catch {
          return onError(makeError('Failed to parse state as JSON.'));
        }
      }
      catch {
        return onError(makeError('Could not decrypt state. Please verify that you are using the correct secret key.'));
      }
    }, transformConfig);
};
