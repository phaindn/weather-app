interface ImportMetaEnv {
  readonly VITE_TEST: string;
  readonly OPEN_WEATHER_API_KEY: string;
  readonly REACT_APP_PERSIST_KEY: string;
  readonly VITE_INDEXDB_NAME: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
