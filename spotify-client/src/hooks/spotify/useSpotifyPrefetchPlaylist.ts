import { trpc } from "@/utils/trpc";
import { useCallback } from "react";

const useSpotifyPrefetchPlaylist = () => {
  const utils = trpc.useContext();

  const prefetchPlaylist = useCallback(
    async (idToPrefetch) => {
      await utils.prefetchQuery(
        ["playlists.playlist-by-id", { playlistId: idToPrefetch }],
        {
          staleTime: 60000,
        }
      );
    },
    [utils]
  );

  return prefetchPlaylist;
};

export default useSpotifyPrefetchPlaylist;
