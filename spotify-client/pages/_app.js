import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";
import useFixMobileHeight from "../hooks/useFixMobileHeight";
import "../styles/globals.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  useFixMobileHeight();

  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </SessionProvider>
  );
}

export default MyApp;
