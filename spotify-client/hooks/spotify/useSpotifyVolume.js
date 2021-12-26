import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import useSpotify from "./useSpotify";

const useSpotifyVolume = () => {
  const { spotifyApi, isAuthenticated } = useSpotify();
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
    if (!isAuthenticated) return;

    debounceSetVolume(volume);
  }, [volume, isAuthenticated]);

  return [volume, setVolume];
};

export default useSpotifyVolume;
