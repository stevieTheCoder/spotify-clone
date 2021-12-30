import { useCallback } from "react";
import { useQueryClient } from "react-query";
import useSpotify from "./useSpotify";

const useSpotifyPrefetchPlaylist = () => {
  const queryClient = useQueryClient();

  const fetchPlaylist = useCallback(
    async (id) => {
      const response = await spotifyApi.getPlaylist(id);
      return response.body;
    },
    [spotifyApi]
  );

  const prefetchPlaylist = useCallback(
    async (idToPrefetch) => {
      await queryClient.prefetchQuery(
        ["playlists", idToPrefetch],
        () => fetchPlaylist(idToPrefetch),
        {
          staleTime: 60000,
        }
      );
    },
    [queryClient, fetchPlaylist]
  );

  return prefetchPlaylist;
};

export default useSpotifyPrefetchPlaylist;
