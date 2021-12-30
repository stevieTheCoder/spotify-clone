import { createReactQueryHooks } from "@trpc/react";
import type { AppRouter } from "@/server/router/app";

export const trpc = createReactQueryHooks<AppRouter>();
