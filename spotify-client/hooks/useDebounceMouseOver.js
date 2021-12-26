import { debounce } from "lodash";
import { useCallback, useRef } from "react";

const useDebounceMouseOver = (callback, delay) => {
  const callbackRef = useRef();
  callbackRef.current = callback;

  const handleOnMouseOver = useCallback(
    debounce(async (value) => {
      if (callbackRef.current) {
        await callbackRef.current(value);
      }
    }, delay),
    [callbackRef, delay]
  );

  const handleOnMouseLeave = useCallback(handleOnMouseOver.cancel(), [
    handleOnMouseOver,
  ]);

  return { handleOnMouseOver, handleOnMouseLeave };
};

export default useDebounceMouseOver;
