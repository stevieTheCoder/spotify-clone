import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";

declare module "next-auth" {
    interface Session {
      /** This is an example. You can find me in types/next-auth.d.ts */
      user: any,
      accessToken: string
      error?: string
    }
  }

declare module "next-auth/jwt" {
    interface JWT {
      /** This is an example. You can find me in types/next-auth.d.ts */
      accessToken: string,
      refreshToken: string,
      accessTokenExpires: number
      error?: string
    }
  }
  