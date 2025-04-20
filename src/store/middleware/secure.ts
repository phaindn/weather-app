import Cipher from '@/utils/cipher';
import { database } from '@/utils/indexdb';
import { PersistOptions, StorageValue } from 'zustand/middleware';

const cipher = new Cipher(import.meta.env.VITE_PERSIST_KEY);

export function secureStore<T = any>(name: string) {
  return {
    name,
    storage: {
      getItem: async (key: string) => {
        const raw = await database(name).getItem<string>(key);
        return raw ? JSON.parse(raw) as StorageValue<T> : null;
        // return raw;// ? await cipher.decrypt(raw) : null;
      },
      setItem: async (key: string, value: any) => {
        const encrypted = await cipher.encrypt(value);
        await database(name).setItem(key, encrypted);
      },
      removeItem: async (key: string) => {
        await database(name).removeItem(key);
      },
    },
    // serialize: (state: any) => cipher.encrypt(state),
    // deserialize: (str: string) => cipher.decrypt(str),
  } satisfies PersistOptions<T>;
}
