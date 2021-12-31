import * as trpc from "@trpc/server";
import { inferAsyncReturnType, TRPCError } from "@trpc/server";
import { getToken } from "next-auth/jwt";
import spotifyApi from "../../utils/spotify";
import { deviceRouter } from "./device";
import { trackRouter } from "./track";
import { playlistsRouter } from "./playlists";
import * as trpcNext from "@trpc/server/adapters/next";

const secret = process.env.JWT_SECRET;

export const createContext = async (
  opts?: trpcNext.CreateNextContextOptions
) => {
  return {
    req: opts?.req,
  };
};

export function createRouter() {
  return trpc.router<Context>();
}

type Context = inferAsyncReturnType<typeof createContext>;

export const appRouter = createRouter()
  .middleware(async ({ ctx, next }) => {
    const { req } = ctx;

    // Calling from Get Static Props
    if (req == null) {
      return next();
    }

    const token = await getToken({ req, secret });
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
