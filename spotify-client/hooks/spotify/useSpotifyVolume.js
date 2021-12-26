import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import useSpotify from "./useSpotify";

const useSpotifyVolume = () => {
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
    debounceSetVolume(volume);
  }, [volume]);

  return [volume, setVolume];
};

export default useSpotifyVolume;
