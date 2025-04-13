interface ImportMetaEnv {
  readonly VITE_TEST: string;
  readonly OPEN_WEATHER_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
