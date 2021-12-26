import { SessionProvider, signIn, useSession } from "next-auth/react";
import { RecoilRoot } from "recoil";
import useFixMobileHeight from "../hooks/useFixMobileHeight";
import { ReactQueryDevtools } from "react-query/devtools";
import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { useEffect } from "react";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  useFixMobileHeight();

  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          {Component.auth ? (
            <Auth>
              <Component {...pageProps} />
            </Auth>
          ) : (
            <Component {...pageProps} />
          )}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </RecoilRoot>
    </SessionProvider>
  );
}

function Auth({ children }) {
  const { data: session, status } = useSession();
  const isUser = !!session?.user;
  useEffect(() => {
    if (status === "loading") return; // Do nothing while loading
    if (!isUser) signIn(); // If not authenticated, force log in
  }, [isUser, status]);

  if (isUser) {
    return children;
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gray-900">
      <img src="/bars.svg" alt="loader" />
    </div>
  );
}

export default MyApp;
