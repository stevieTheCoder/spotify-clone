import * as trpc from "@trpc/server";
import { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { inferAsyncReturnType, TRPCError } from "@trpc/server";
import { getToken } from "next-auth/jwt";
import { z } from "zod";
import spotifyApi from "../../utils/spotify";

const secret = process.env.JWT_SECRET;

export async function createContext({ req, res }: CreateNextContextOptions) {
  return {
    req,
  };
}

function createRouter() {
  return trpc.router<Context>();
}

type Context = inferAsyncReturnType<typeof createContext>;

export const appRouter = createRouter().query("active-device", {
  async resolve({ ctx }) {
    const token = await getToken({ req: ctx.req, secret });
    if (!token) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    spotifyApi.setAccessToken(token.accessToken);

    const response = await spotifyApi.getMyDevices();
    console.log(response);
    return { name: "blah", volume: 50 };
  },
});

export type AppRouter = typeof appRouter;
