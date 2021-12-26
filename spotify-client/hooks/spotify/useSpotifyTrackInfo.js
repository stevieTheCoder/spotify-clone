import useSpotify from "./useSpotify";
import { useQuery } from "react-query";
import useSpotifyGetCurrentlyPlaying from "./useSpotifyGetCurrentlyPlaying";

const useSpotifyTrackInfo = () => {
  const { spotifyApi, isAuthenticated } = useSpotify();
  const { data: currentlyPlayingTrackId } = useSpotifyGetCurrentlyPlaying();

  const fetchTrackInfo = async (id) => {
    const response = await spotifyApi.getTrack(id);
    return response.body;
  };

  const { isIdle, isLoading, isError, data, error } = useQuery(
    ["trackInfo", currentlyPlayingTrackId],
    () => fetchTrackInfo(currentlyPlayingTrackId),
    {
      enabled: isAuthenticated && !!currentlyPlayingTrackId,
      staleTime: 600000,
    }
  );

  return { isIdle, isLoading, isError, data, error };
};

export default useSpotifyTrackInfo;
