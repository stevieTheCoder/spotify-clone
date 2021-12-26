import { useQuery } from "react-query";
import useSpotify from "./useSpotify";

const useSpotifyGetCurrentlyPlaying = () => {
  const { spotifyApi } = useSpotify();

  const fetchCurrentPlayingTrack = async () => {
    const response = await spotifyApi.getMyCurrentPlayingTrack();
    return response.body?.item?.id;
  };

  const { isIdle, isLoading, isError, data, error } = useQuery(
    "currentlyPlayingTrackId",
    fetchCurrentPlayingTrack
  );

  return { isIdle, isLoading, isError, data, error };
};

export default useSpotifyGetCurrentlyPlaying;
