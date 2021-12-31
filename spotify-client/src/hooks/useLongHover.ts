import useTimeout from "./useTimeout";
import useEffectOnce from "./useEffectOnce";
import useEventListener from "./useEventListener";
import { MutableRefObject } from "react";

const useLongHover = (
  ref: MutableRefObject<HTMLElement | null>,
  callback: () => void,
  { delay = 200 } = {}
) => {
  const { reset, clear } = useTimeout(callback, delay);
  useEffectOnce(clear);

  useEventListener("mouseenter", reset, ref.current);

  useEventListener("mouseleave", clear, ref.current);
};

export default useLongHover;
