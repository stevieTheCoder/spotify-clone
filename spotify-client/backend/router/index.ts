import * as trpc from "@trpc/server";
import { z } from "zod";

export const appRouter = trpc.router().query("active-device", {
  resolve() {
    return { name: "blah", volume: 50 };
  },
});

export type AppRouter = typeof appRouter;
