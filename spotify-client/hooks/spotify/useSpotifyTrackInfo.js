import useSpotify from "./useSpotify";
import { useQuery } from "react-query";

const useSpotifyTrackInfo = () => {
  const { spotifyApi, isAuthenticated } = useSpotify();

  const fetchCurrentPlayingTrack = async () => {
    const response = await spotifyApi.getMyCurrentPlayingTrack();
    return response.body?.item?.id;
  };

  const fetchTrackInfo = async (id) => {
    const response = await spotifyApi.getTrack(id);
    return response.body;
  };

  const { data: selectedTrackId } = useQuery(
    "selectedTrackId",
    fetchCurrentPlayingTrack,
    {
      enabled: isAuthenticated,
    }
  );

  const { isIdle, isLoading, isError, data, error } = useQuery(
    ["trackInfo", selectedTrackId],
    () => fetchTrackInfo(selectedTrackId),
    {
      enabled: isAuthenticated && !!selectedTrackId,
      staleTime: 600000,
    }
  );

  return { isIdle, isLoading, isError, data, error };
};

export default useSpotifyTrackInfo;
