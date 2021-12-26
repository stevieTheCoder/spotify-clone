import { useQuery } from "react-query";
import useSpotify from "./useSpotify";

function useSpotifyIsPlaying() {
  const { spotifyApi, isAuthenticated } = useSpotify();

  const fetchIsPlaying = async () => {
    const response = await spotifyApi.getMyCurrentPlaybackState();
    return response.body.is_playing;
  };

  const { isIdle, isLoading, isError, data, error, refetch } = useQuery(
    "isPlaying",
    fetchIsPlaying,
    {
      enabled: isAuthenticated,
      staleTime: 120, // Prevents immediate refetching as spotify API has delay
    }
  );

  return { isIdle, isLoading, isError, data, error, refetch };
}

export default useSpotifyIsPlaying;
