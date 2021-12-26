import { useQuery } from "react-query";
import useSpotify from "./useSpotify";

const useSpotifyGetCurrentlyPlaying = () => {
  const { spotifyApi, isAuthenticated } = useSpotify();

  const fetchCurrentPlayingTrack = async () => {
    const response = await spotifyApi.getMyCurrentPlayingTrack();
    return response.body?.item?.id;
  };

  const { isIdle, isLoading, isError, data, error } = useQuery(
    "currentlyPlayingTrackId",
    fetchCurrentPlayingTrack,
    {
      enabled: isAuthenticated,
    }
  );

  return { isIdle, isLoading, isError, data, error };
};

export default useSpotifyGetCurrentlyPlaying;
