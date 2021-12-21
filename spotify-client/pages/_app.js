import { SessionProvider } from "next-auth/react";
import { useEffect } from "react";
import { RecoilRoot } from "recoil";
import "../styles/globals.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const setViewHeight = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
    console.log("setting view height", vh);
  };

  useEffect(() => {
    setViewHeight();

    window.addEventListener("resize", setViewHeight);

    return () => {
      window.removeEventListener("resize", setViewHeight);
    };
  }, []);

  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </SessionProvider>
  );
}

export default MyApp;
