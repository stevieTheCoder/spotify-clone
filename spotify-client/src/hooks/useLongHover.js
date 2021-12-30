import useTimeout from "./useTimeout";
import useEffectOnce from "./useEffectOnce";
import useEventListener from "./useEventListener";

const useLongHover = (ref, callback, { delay = 250 } = {}) => {
  const { reset, clear } = useTimeout(callback, delay);
  useEffectOnce(clear);

  useEventListener("mouseenter", reset, ref.current);
  useEventListener("mouseleave", clear, ref.current);
};

export default useLongHover;
