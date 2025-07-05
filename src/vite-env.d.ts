// vite-env.d.ts or a separate types file
interface ImportMetaEnv {
  readonly VITE_APP_BACKEND: string;
  // add more env variables here as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
