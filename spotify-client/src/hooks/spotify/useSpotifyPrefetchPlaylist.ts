import { trpc } from "@/utils/trpc";
import { useCallback } from "react";

const useSpotifyPrefetchPlaylist = () => {
  const utils = trpc.useContext();

  const prefetchPlaylist = useCallback(
    async (idToPrefetch: string) => {
      await utils.prefetchQuery(
        ["playlists.playlist-by-id", { playlistId: idToPrefetch }],
        {
          staleTime: 1000 * 60 * 60, // 1 hour
        }
      );
    },
    [utils]
  );

  return prefetchPlaylist;
};

export default useSpotifyPrefetchPlaylist;
