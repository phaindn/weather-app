export class IndexedDatabase {
  #name: string;
  #version: number;

  constructor(name: string, version: number) {
    this.#name = name;
    this.#version = version;
  }

  getStore(storeName: string): Promise<IDBObjectStore> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.#name, this.#version);

      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName);
        }
      };

      request.onsuccess = () => {
        const tx = request.result.transaction(storeName, 'readwrite');
        const store = tx.objectStore(storeName);
        resolve(store);
      };

      request.onerror = () => reject(request.error);
    });
  }

  indexedDBStorage(storeName: string) {
    return ({
      getItem: async (key: string) => {
        const store = await this.getStore(storeName);
        return new Promise((res, rej) => {
          const req = store.get(key);
          req.onsuccess = () => res(req.result ?? null);
          req.onerror = () => rej(req.error);
        });
      },

      setItem: async (key: string, value: string) => {
        const store = await this.getStore(storeName);
        return new Promise((res, rej) => {
          const req = store.put(value, key);
          req.onsuccess = () => res(value);
          req.onerror = () => rej(req.error);
        });
      },

      removeItem: async (key: string) => {
        const store = await this.getStore(storeName);
        return new Promise((res, rej) => {
          const req = store.delete(key);
          req.onsuccess = () => res(undefined);
          req.onerror = () => rej(req.error);
        });
      },
    })
  }
}

const DB_NAME = import.meta.env.VITE_INDEXDB_NAME || 'weather-app';
const DB_VERSION = 1;

function getStore(storeName: string): Promise<IDBObjectStore> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName);
      }
    };

    request.onsuccess = () => {
      const tx = request.result.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      resolve(store);
    };

    request.onerror = () => reject(request.error);
  });
}

export const database = (storeName: string) => ({
  getItem: async <T = any>(key: string) => {
    const store = await getStore(storeName);
    return new Promise<T>((res, rej) => {
      const req = store.get(key);
      req.onsuccess = () => res(req.result ?? null);
      req.onerror = () => rej(req.error);
    });
  },

  setItem: async (key: string, value: string) => {
    const store = await getStore(storeName);
    return new Promise((res, rej) => {
      const req = store.put(value, key);
      req.onsuccess = () => res(value);
      req.onerror = () => rej(req.error);
    });
  },

  removeItem: async (key: string) => {
    const store = await getStore(storeName);
    return new Promise((res, rej) => {
      const req = store.delete(key);
      req.onsuccess = () => res(undefined);
      req.onerror = () => rej(req.error);
    });
  },
});
