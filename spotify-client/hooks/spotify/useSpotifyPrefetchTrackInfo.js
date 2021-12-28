import { useCallback } from "react";
import { useQueryClient } from "react-query";
import useSpotify from "./useSpotify";

const useSpotifyPrefetchTrackInfo = () => {
  const queryClient = useQueryClient();
  const { spotifyApi } = useSpotify();

  const fetchTrackInfo = useCallback(
    async (id) => {
      const response = await spotifyApi.getTrack(id);
      return {
        trackId: response.body.id,
        albumSrc: response.body.album.images[0].url,
        artist: response.body.artists[0].name,
        name: response.body.name,
      };
    },
    [spotifyApi]
  );

  const prefetchTrackInfo = useCallback(
    async (idToPrefetch) => {
      await queryClient.prefetchQuery(
        ["trackInfo", idToPrefetch],
        () => fetchTrackInfo(idToPrefetch),
        {
          staleTime: 60000,
        }
      );
    },
    [fetchTrackInfo, queryClient]
  );

  return prefetchTrackInfo;
};

export default useSpotifyPrefetchTrackInfo;
