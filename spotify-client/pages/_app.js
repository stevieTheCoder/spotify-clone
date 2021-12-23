import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";
import useFixMobileHeight from "../hooks/useFixMobileHeight";
import { ReactQueryDevtools } from "react-query/devtools";
import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  useFixMobileHeight();

  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </RecoilRoot>
    </SessionProvider>
  );
}

export default MyApp;
