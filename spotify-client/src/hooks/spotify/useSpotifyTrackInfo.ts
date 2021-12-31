import { trpc } from "@/utils/trpc";
import useSpotifyGetCurrentlyPlaying from "./useSpotifyGetCurrentlyPlaying";

const useSpotifyTrackInfo = () => {
  const { data: currentlyPlayingTrackId } = useSpotifyGetCurrentlyPlaying();

  const queryTrackInfo = trpc.useQuery(
    ["track.track-info", { trackId: currentlyPlayingTrackId?.trackId ?? "" }], // Won't be called with empty string due to enabled flag
    {
      enabled: !!currentlyPlayingTrackId?.trackId,
      staleTime: Infinity,
    }
  );

  return queryTrackInfo;
};

export default useSpotifyTrackInfo;
