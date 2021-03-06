import { trpc } from "@/utils/trpc";

function useSpotifyIsPlaying() {
  const queryIsPlaying = trpc.useQuery(["device.current-playback-state"], {
    staleTime: 500, // Prevents immediate refetching as spotify API has delay
  });

  return queryIsPlaying;
}

export default useSpotifyIsPlaying;
