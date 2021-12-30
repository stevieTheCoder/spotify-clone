import { useCallback } from "react";
import { useQuery } from "react-query";
import useSpotify from "./useSpotify";

function useSpotifyIsPlaying() {
  const { spotifyApi } = useSpotify();

  const fetchIsPlaying = useCallback(async () => {
    const response = await spotifyApi.getMyCurrentPlaybackState();
    if (response.statusCode === 204) {
      return false; // Not playing
    }
    return response.body.is_playing;
  }, [spotifyApi]);

  const queryIsPlaying = useQuery("isPlaying", fetchIsPlaying, {
    staleTime: 120, // Prevents immediate refetching as spotify API has delay
  });

  return queryIsPlaying;
}

export default useSpotifyIsPlaying;
