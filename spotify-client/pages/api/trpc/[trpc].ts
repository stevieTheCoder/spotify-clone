import * as trpcNext from "@trpc/server/adapters/next";

import { appRouter, createContext } from "../../../backend/router";

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: createContext,
});
