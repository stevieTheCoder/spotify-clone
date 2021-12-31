/* eslint-disable react/prop-types */
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";
import useFixMobileHeight from "../hooks/useFixMobileHeight";
import { ReactQueryDevtools } from "react-query/devtools";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AppRouter } from "@/server/router/app";
import { withTRPC } from "@trpc/next";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {

  useFixMobileHeight();

  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />     
      </RecoilRoot>
    </SessionProvider>
  )
}

export default withTRPC<AppRouter>({
  config({ctx}) { 
    const url = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/api/trpc`
      : "http://localhost:3000/api/trpc";

    return {
      url,
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: false,
})(MyApp);

