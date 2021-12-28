import useSpotify from "./useSpotify";
import { useQuery, useQueryClient } from "react-query";
import useSpotifyGetCurrentlyPlaying from "./useSpotifyGetCurrentlyPlaying";
import { useCallback } from "react";

const useSpotifyTrackInfo = () => {
  const { spotifyApi } = useSpotify();
  const { data: currentlyPlayingTrackId } = useSpotifyGetCurrentlyPlaying();
  const queryClient = useQueryClient();

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

  const queryTrackInfo = useQuery(
    ["trackInfo", currentlyPlayingTrackId],
    () => fetchTrackInfo(currentlyPlayingTrackId),
    {
      enabled: !!currentlyPlayingTrackId,
      staleTime: 60000,
    }
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

  return { queryTrackInfo, prefetchTrackInfo };
};

export default useSpotifyTrackInfo;
