import * as trpc from "@trpc/server";
import { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { inferAsyncReturnType, TRPCError } from "@trpc/server";
import { getToken } from "next-auth/jwt";
import spotifyApi from "../../utils/spotify";
import { deviceRouter } from "./device";
import { trackRouter } from "./track";
import { playlistsRouter } from "./playlists";

const secret = process.env.JWT_SECRET;

export async function createContext({ req }: CreateNextContextOptions) {
  return {
    req,
  };
}

export function createRouter() {
  return trpc.router<Context>();
}

type Context = inferAsyncReturnType<typeof createContext>;

export const appRouter = createRouter()
  .middleware(async ({ ctx, next }) => {
    const token = await getToken({ req: ctx.req, secret });
    if (!token) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    spotifyApi.setAccessToken(token.accessToken);
    return next();
  })
  .merge("device.", deviceRouter)
  .merge("track.", trackRouter)
  .merge("playlists.", playlistsRouter);

export type AppRouter = typeof appRouter;
