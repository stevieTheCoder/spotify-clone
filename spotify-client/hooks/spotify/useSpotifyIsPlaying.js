import { useQuery } from "react-query";
import useSpotify from "./useSpotify";

function useSpotifyIsPlaying() {
  const { spotifyApi } = useSpotify();

  const fetchIsPlaying = async () => {
    const response = await spotifyApi.getMyCurrentPlaybackState();
    return response.body.is_playing;
  };

  const { isIdle, isLoading, isError, data, error } = useQuery(
    "isPlaying",
    fetchIsPlaying,
    {
      staleTime: 120, // Prevents immediate refetching as spotify API has delay
    }
  );

  return { isIdle, isLoading, isError, data, error };
}

export default useSpotifyIsPlaying;
