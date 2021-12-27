import { debounce } from "lodash";
import { useCallback, useEffect, useRef, useState } from "react";
import useSpotify from "./useSpotify";

const useSpotifyVolume = () => {
  const firstRenderRef = useRef(true);
  const { spotifyApi } = useSpotify();
  const [volume, setVolume] = useState(100);

  const debounceSetVolume = useCallback(
    debounce(async (value) => {
      try {
        await spotifyApi.setVolume(value);
      } catch (err) {
        console.log("Something went wrong!", err);
      }
    }, 500),
    []
  );

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }
    debounceSetVolume(volume);
  }, [volume]);

  return [volume, setVolume];
};

export default useSpotifyVolume;
