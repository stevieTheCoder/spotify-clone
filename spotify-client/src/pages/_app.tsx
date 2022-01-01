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
  // useFixMobileHeight();

  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </RecoilRoot>
    </SessionProvider>
  );
}

const getBaseUrl = () => {
  if (process.browser) return ""; // Browser should use current path
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url

  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

export default withTRPC<AppRouter>({
  config() {
    const url = `${getBaseUrl()}/api/trpc`;

    return {
      url,
    };
  },

  ssr: false,
})(MyApp);
