namespace NodeJS {
    interface ProcessEnv extends NodeJS.ProcessEnv {
        SPOTIFY_ID: string
        SPOTIFY_SECRET: string
        JWT_SECRET: string
    }
}