import { useEffect } from "react";
import { isMobile } from "react-device-detect";

function useFixMobileHeight() {
  const setViewHeight = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  };

  useEffect(() => {
    if (!isMobile) return;

    setViewHeight();

    window.addEventListener("resize", setViewHeight);

    return () => {
      window.removeEventListener("resize", setViewHeight);
    };
  }, []);
}

export default useFixMobileHeight;
