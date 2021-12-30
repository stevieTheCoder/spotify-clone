import { trpc } from "@/utils/trpc";
import useSpotifyGetCurrentlyPlaying from "./useSpotifyGetCurrentlyPlaying";

const useSpotifyTrackInfo = () => {
  const { data: currentlyPlayingTrackId } = useSpotifyGetCurrentlyPlaying();

  const queryTrackInfo = trpc.useQuery(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    ["track.track-info", { trackId: currentlyPlayingTrackId?.trackId ?? "" }],
    {
      enabled: !!currentlyPlayingTrackId?.trackId,
      staleTime: 60000,
    }
  );

  return queryTrackInfo;
};

export default useSpotifyTrackInfo;
