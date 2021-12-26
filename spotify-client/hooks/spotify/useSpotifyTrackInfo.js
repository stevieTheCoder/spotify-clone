import useSpotify from "./useSpotify";
import { useQuery, useQueryClient } from "react-query";
import useSpotifyGetCurrentlyPlaying from "./useSpotifyGetCurrentlyPlaying";

const useSpotifyTrackInfo = () => {
  const { spotifyApi, isAuthenticated } = useSpotify();
  const { data: currentlyPlayingTrackId } = useSpotifyGetCurrentlyPlaying();
  const queryClient = useQueryClient();

  const fetchTrackInfo = async (id) => {
    const response = await spotifyApi.getTrack(id);
    return {
      trackId: response.body.id,
      albumSrc: response.body.album.images[0].url,
      artist: response.body.artists[0].name,
      name: response.body.name,
    };
  };

  const { isIdle, isLoading, isError, data, error } = useQuery(
    ["trackInfo", currentlyPlayingTrackId],
    () => fetchTrackInfo(currentlyPlayingTrackId),
    {
      enabled: isAuthenticated && !!currentlyPlayingTrackId,
      staleTime: 60000,
    }
  );

  const prefetchTrackInfo = async (idToPrefetch) => {
    await queryClient.prefetchQuery(
      ["trackInfo", idToPrefetch],
      () => fetchTrackInfo(idToPrefetch),
      {
        staleTime: 60000,
      }
    );
  };

  return { isIdle, isLoading, isError, data, error, prefetchTrackInfo };
};

export default useSpotifyTrackInfo;
