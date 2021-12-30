namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    SPOTIFY_ID: string;
    SPOTIFY_SECRET: string;
    JWT_SECRET: string;
    NEXT_PUBLIC_CLIENT_ID: string;
    NEXT_PUBLIC_CLIENT_SECRET: string;
  }
}
