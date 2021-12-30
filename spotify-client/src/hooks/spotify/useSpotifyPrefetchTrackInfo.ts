import { trpc } from "@/utils/trpc";
import { useCallback } from "react";

const useSpotifyPrefetchTrackInfo = () => {
  const utils = trpc.useContext();

  const prefetchTrackInfo = useCallback(
    async (idToPrefetch) => {
      await utils.prefetchQuery(
        ["track.track-info", { trackId: idToPrefetch }],
        {
          staleTime: 60000,
        }
      );
    },
    [utils]
  );

  return prefetchTrackInfo;
};

export default useSpotifyPrefetchTrackInfo;
