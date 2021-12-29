/* eslint-disable react/prop-types */
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";
import useFixMobileHeight from "../hooks/useFixMobileHeight";
import { ReactQueryDevtools } from "react-query/devtools";
import "../styles/globals.css";
import { QueryClient, QueryClientProvider, Hydrate } from "react-query";
import { useState } from "react";
import type { AppProps } from "next/app";
import { AppRouter } from "../backend/router";
import { withTRPC } from "@trpc/next";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  useFixMobileHeight();

  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>

                <Component {...pageProps} />

            <ReactQueryDevtools initialIsOpen={false} />
          </Hydrate>
        </QueryClientProvider>
      </RecoilRoot>
    </SessionProvider>
  )
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/api/trpc`
      : "http://localhost:3000/api/trpc";

    return {
      url,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: true,
})(MyApp);

