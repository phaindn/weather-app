export default class Cipher {
  static #algorithm = 'AES-GCM';

  secretKey: string;

  constructor(secretKey: string) {
    this.secretKey = secretKey;
  }

  async #getKeyMaterial() {
    const encoder = new TextEncoder();
    const keyMaterial = await window.crypto.subtle.importKey('raw', encoder.encode(this.secretKey), 'AES-GCM', false, ['encrypt', 'decrypt']);
    return keyMaterial;
  }

  async #getKey(salt: Uint8Array, iv: Uint8Array) {
    const keyMaterial = await this.#getKeyMaterial();
    const key = await window.crypto.subtle.deriveKey(
      {
        name: Cipher.#algorithm,
        salt,
      },
      keyMaterial,
      { name: Cipher.#algorithm, length: 256 },
      false,
      ['encrypt', 'decrypt']
    )
    return key;
  }

  async encrypt(plain: string) {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    const salt = window.crypto.getRandomValues(new Uint8Array(16));
    const iv = window.crypto.getRandomValues(new Uint8Array(16));
    const key = await this.#getKey(salt, iv);
    const encrypted = await window.crypto.subtle.encrypt(
      { name: Cipher.#algorithm, iv },
      key,
      data
    );

    const result = new Uint8Array(salt.length + iv.length + encrypted.byteLength);
    result.set(salt);
    result.set(iv, salt.length);
    result.set(new Uint8Array(encrypted), salt.length + iv.length);

    return btoa(String.fromCharCode(...result));
  }

  async decrypt(cipher: string) {
    const decoder = new TextDecoder();
    const data = new Uint8Array(atob(cipher).split('').map(char => char.charCodeAt(0)));
    const salt = data.slice(0, 16);
    const iv = data.slice(16, 32);
    const encrypted = data.slice(32);
    const key = await this.#getKey(salt, iv);
    const decrypted = await window.crypto.subtle.decrypt(
      { name: Cipher.#algorithm, iv },
      key,
      encrypted
    );
    return decoder.decode(decrypted);
  }

}
